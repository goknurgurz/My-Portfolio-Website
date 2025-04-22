// dbs.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const gg = () => {
    mongoose.connect(process.env.DB_URL, {
        dbName: "gg-blog",
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
};
gg()
module.exports = gg;
