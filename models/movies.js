const mongoose = require('mongoose');

// create schema for the movie collection in the database
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    year: Number,
    duration: Number,
    genres: [String],
    rating: Number,
    ratingTotal: Number,
    totalRating: Number,
    comments: [{
        username: {
            type: String,
            default: 'Anonymous'
        },
        body: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    posterImage: String,
    bannerImage: String,
    color: {
        type: String,
        default: 'rgba(141, 12, 0, 0.4)'
    }
});

// add a "comment" method to the movieSchema, 
// basically the function fired to comment on a movie
movieSchema.statics.comment = async function (id, comment) {
    const movie = await Movie.findById(id);
    if (movie) {
        movie.comments = [comment, ...movie.comments]
        const res = await movie.save();
        if (res) {
            return res;
        } else {
            throw Error('An error occured while saving');
        }
    } else {
        throw Error('Movie not found');
    }
}

// add a "rate" method to the movieSchema
movieSchema.statics.rate = async function (id, rating) {
    const movie = await Movie.findById(id);
    if (movie) {
        movie.rating = (movie.ratingTotal + rating) / (movie.totalRating + 1);
        movie.ratingTotal = movie.ratingTotal + rating;
        movie.totalRating = movie.totalRating + 1;
        const res = movie.save();
        if (res) {
            return res;
        } else {
            throw Error('An error occured while saving');
        }
    } else {
        throw Error('Movie not found');
    }
}

// create Movie model from the movieSchema
const Movie = mongoose.model("movie", movieSchema);

// export the model for use in controllers
module.exports = Movie;