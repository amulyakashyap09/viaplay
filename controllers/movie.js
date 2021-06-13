const config = require('config');
const request = require('../helpers/request');
const errors = require('../helpers/error');
const utils = require('../helpers/functions');
const { logger } = require('../helpers/logger');
const redis = require('../db/redis/redis');

const TMDB_KEY = config.tmdbApiKey;

const getMovieFromRedis = async (movieName) => {
  const data = await redis.getFromCache(movieName);
  return data;
};

const getTrailerFromImdb = async (movie) => {
  const movieDetails = await request.get(movie.movieUrl);
  if (!movieDetails || Object.keys(movieDetails).length < 1) {
    logger.error({ uri: movie.movieUrl, message: 'No such movie details found', statusCode: 404 });
    return { trailer: null, error: { uri: movie.movieUrl, message: 'No such movie details found', statusCode: 404 } };
  }
  // eslint-disable-next-line no-underscore-dangle
  const movieImdbDetails = movieDetails._embedded['viaplay:blocks'][0]._embedded['viaplay:product'].content.imdb;
  // eslint-disable-next-line no-undef
  const tmdbMovieUrl = `${config.tmdbAPI + movieImdbDetails.id}/videos?api_key=${TMDB_KEY}`;
  const tmdbMovieTrailers = await request.get(tmdbMovieUrl);
  if (utils.isEmpty(tmdbMovieTrailers) || utils.isEmpty(tmdbMovieTrailers.results)) {
    logger.error({ uri: movie.movieUrl, message: 'No trailers found', statusCode: 404 });
    return { trailer: null, error: { uri: movie.movieUrl, message: 'No trailer found', statusCode: 404 } };
  }
  const trailer = tmdbMovieTrailers.results[0].key;
  const youtubeTrailer = config.youtubeUri + trailer;
  redis.setInCache(movie.movieName, { trailer: youtubeTrailer, ...movieImdbDetails });
  logger.info({ uri: movie.movieUrl, message: youtubeTrailer, statusCode: 200 });
  return { data: youtubeTrailer, error: {} };
};

module.exports = {
  getTrailer: async (req, res, next) => {
    const { movieUrl } = req.query;
    try {
      const movieName = movieUrl.substring(movieUrl.lastIndexOf('/') + 1);
      const movieData = await getMovieFromRedis(movieName);
      if (!utils.isEmpty(movieData)) {
        logger.info({ uri: movieUrl, message: movieData.trailer, statusCode: 200 });
        res.status(200).send({
          trailer: movieData.trailer,
        });
      } else {
        const trailerResp = await getTrailerFromImdb({ movieUrl, movieName });
        if (utils.isEmpty(trailerResp.error) && trailerResp.data && trailerResp.data.length) {
          res.status(200).send({
            trailer: trailerResp.data,
          });
        } else {
          errors.create(trailerResp.error, next);
        }
      }
    } catch (error) {
      logger.error({ uri: movieUrl || null, message: error.message, statusCode: 500 });
      res.status(500).send(error);
    }
  },
};
