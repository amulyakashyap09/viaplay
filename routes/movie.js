const express = require('express');

const router = express.Router();
const validator = require('../helpers/validation');
const controller = require('../controllers/movie');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('server running !!!');
});

/* GET movie trailer. */
router.get('/trailer', validator.getTrailer, controller.getTrailer);

module.exports = router;
