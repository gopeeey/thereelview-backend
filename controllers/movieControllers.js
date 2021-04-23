// require Movie model
const Movie = require('../models/movies');

// an abstraction to return a movie as a response to a user's request
const returnMovie = (res, movie) => {
    res.status(200).json({
        error: false,
        data: {
            movie
        }
    });
}

// another abstraction to give a response when the requested movie is not found
const return404 = (res) => {
    res.status(404).json({
        error: true,
        errorMessage: 'Movie not found'
    })
}

// controller that handles movie creation
// fires when /movies/create is visited
module.exports.createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        returnMovie(res, newMovie);
    } catch (error) {
        return404(res);
    }
}

// controller that fetches all movies in the database
// fires at /movies/getall
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


// gets a specific movie by id
// fires at /movies/get
module.exports.getMovie = async (req, res) => {
    const { id } = req.body;
    try {
        const movie = await Movie.findById(id);
        returnMovie(res, movie);
    } catch (error) {
        return404(res);
    }
}

// controller that handles commenting on a movie
// uses the Movie.comment method created in the model.js file
// fires at /movies/comment
module.exports.commentOnMovie = async (req, res) => {
    const { id, comment } = req.body;
    try {
        const movie = await Movie.comment(id, comment);
        returnMovie(res, movie);
    } catch (error) {
        return404(res);
    }
}

// controller that handles rating a movie
// uses the Movie.rate method created in the model.js file
// fires at /movies/rate
module.exports.rateMovie = async (req, res) => {
    const { id, rating } = req.body;
    try {
        const movie = await Movie.rate(id, rating);
        returnMovie(res, movie);
    } catch (error) {
        return404(res);
    }
}