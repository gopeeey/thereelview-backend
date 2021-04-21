const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    dbUrl: process.env.DB_URL || 'mongodb://127.0.0.1:27017/thereelviews',
    port: process.env.PORT || 3030
}