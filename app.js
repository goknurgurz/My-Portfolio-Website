const express = require("express");
const { engine } = require("express-handlebars");
const expressSession = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const crypto = require("crypto");

const dbs = require(path.join(__dirname, "dbs.js"));

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
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: SECRET_VALUE,
    saveUninitialized: true,
    resave: false,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: time,
    },
  })
);


//static files
app.use(express.static(path.join(__dirname, "public")));

//routes
const indexPage = require(path.join(__dirname, "router", "indexPage.js"));
const aboutPage = require(path.join(__dirname, "router", "aboutPage.js"));
const addPage = require(path.join(__dirname, "router", "addPage.js"));
const loginPage = require(path.join(__dirname, "router", "loginPage.js"));
const registerPage = require(path.join(__dirname, "router", "registerPage.js"));
const logoutPage = require(path.join(__dirname, "router", "logoutPage.js"));
const errorPage = require(path.join(__dirname, "router", "errorPage.js"));

//user giris kontrolu
app.use("/", (req, res, next) => {
  const {userID} = req.session;
  req.session.UserID ='680fd77476c3f5a3b5fe505f'
  if (userID) {
    res.locals.user = true;
  } else {
    res.locals.user = false;
  }
  next();
})

//routes+
app.use("/", indexPage);
app.use("/about", aboutPage);
app.use("/add", addPage);
app.use("/login", loginPage);
app.use("/register", registerPage);
app.use("/logout", logoutPage);
app.use("/error", errorPage);
//next
app.use("/", (req, res, next) => {
res.render('site/error')
  });
app.listen(PORT, () => {
  console.log(`server is running ${API_URL}`);
});
