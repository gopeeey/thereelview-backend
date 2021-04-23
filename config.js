
// declare environment variables and defaults in case there are none
module.exports = {
    dbUrl: process.env.DB_URL || 'mongodb://127.0.0.1:27017/thereelviews',
    port: process.env.PORT || 3030,
    allowedOrigin: process.env.ALLOWED_ORIGIN || "http://localhost:3000"
}