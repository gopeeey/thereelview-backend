const Movie = require('../models/movies');

const returnMovie = (res, movie) => {
    res.status(200).json({
        error: false,
        data: {
            movie
        }
    });
}

const return404 = (res) => {
    res.status(404).json({
        error: true,
        errorMessage: 'Movie not found'
    })
}

module.exports.createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        returnMovie(res, newMovie);
    } catch (error) {
        return404(res);
    }
}

module.exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        movies.reverse();
        res.status(200).json({
            error: false,
            data: {
                movies
            }
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            errorMessage: 'Database error'
        });
    }
}


module.exports.getMovie = async (req, res) => {
    const { id } = req.body;
    try {
        const movie = await Movie.findById(id);
        returnMovie(res, movie);
    } catch (error) {
        return404(res);
    }
}


module.exports.commentOnMovie = async (req, res) => {
    const { id, comment } = req.body;
    try {
        const movie = await Movie.comment(id, comment);
        returnMovie(res, movie);
    } catch (error) {
        return404(res);
    }
}

module.exports.rateMovie = async (req, res) => {
    const { id, rating } = req.body;
    try {
        const movie = await Movie.rate(id, rating);
        returnMovie(res, movie);
    } catch (error) {
        return404(res);
    }
}