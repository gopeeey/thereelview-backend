const { Router } = require('express');
const movieControllers = require('../controllers/movieControllers');

const router = Router();

router.get('/getall', movieControllers.getMovies);
router.post('/create', movieControllers.createMovie);
router.post('/get', movieControllers.getMovie);
router.post('/comment', movieControllers.commentOnMovie);
router.post('/rate', movieControllers.rateMovie);

module.exports = router;