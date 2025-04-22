const express = require('express');
const { engine } = require('express-handlebars');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

const dbs = require(path.join(__dirname, 'dbs.js'));


//db connect
dbs();

//start settings
dotenv.config();
const app = express();

//variables
const time = 1000 * 60 * 60 * 30;
const SECRET_VALUE = process.env.SECRET_VALUE || "gg-blog";
const PORT = process.env.PORT || 3000;
const API_URL = process.env.API_URL || "http://127.0.0.1:3000";
//handlebars packet
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(express.json());
app.use(expressSession({ 
    secret: SECRET_VALUE, 
    saveUninitialized: true, 
    resave: false,
    cookie: {
        path: '/', 
        httpOnly: true, 
        secure: false, 
        maxAge: time
    }
}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/',(req,res) => {
res.render('site/index')
})

app.listen(PORT, () => {
    console.log(`server is running ${API_URL}`);
});
