const request = require('supertest');
const app = require('../app');

describe('Get Endpoints', () => {

  it('should return 400 ', async () => {
    const res = await request(app)
      .get('/movies/trailer')
    expect(res.statusCode).toEqual(400);
  });

  it('should return trailer for the movie', async () => {
    const res = await request(app)
      .get('/movies/trailer?movieUrl=https://content.viaplay.se/pc-se/film/arrival-2016')
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('trailer');
    expect(res.body).toMatchObject({
      "trailer": "https://www.youtube.com/watch?v=gwqSi_ToNPs"
    });
  });
});
