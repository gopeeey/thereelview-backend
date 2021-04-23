const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');

// require environment variables
const { dbUrl, port, allowedOrigin } = require('./config')

const app = express();

// connect to database
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    app.listen(port, () => {
        console.log(`server started on port ${port}`);
    });
}).catch(err => {
    console.log(err);
});

// declare allowed origins
const allowedOrigins = [
    allowedOrigin,
]

// use middleware to check if request origin is part of allowed origins
app.use(cors({
    origin: (origin, callback) => (
        allowedOrigins.includes(origin) ? (callback(null, true)) : (callback(new Error(
            `The CORS policy for this site does not allow access from the specified origin`
        ), false))
    )
}))

// parse received json data
app.use(express.json());


// use a router to handle all routes that start with "/movies"
app.use('/movies', movieRoutes);

// small play
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

