const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const movieRoutes = require('./routes/movieRoutes');
const { dbUrl, port, allowedOrigin } = require('./config')

const app = express();

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

const allowedOrigins = [
    allowedOrigin,
]

app.use(cors({
    origin: (origin, callback) => (
        allowedOrigins.includes(origin) ? (callback(null, true)) : (callback(new Error(
            `The CORS policy for this site does not allow access from the specified origin`
        ), false))
    )
}))

app.use(express.json());

app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});

