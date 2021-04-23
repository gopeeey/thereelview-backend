const { Router } = require('express');

// require controllers: these are the functions you call in response to a request
const movieControllers = require('../controllers/movieControllers');

// initialize router;
const router = Router();

// add the various end points and their controllers to the router
router.get('/getall', movieControllers.getMovies);
router.post('/create', movieControllers.createMovie);
router.post('/get', movieControllers.getMovie);
router.post('/comment', movieControllers.commentOnMovie);
router.post('/rate', movieControllers.rateMovie);

// export router for use in app.js
module.exports = router;