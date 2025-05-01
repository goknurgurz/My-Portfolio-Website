const express = require('express');
const router = express.Router();
const { join } = require("path");

// Kullanıcı modelimizi içeri aktarıyoruz
const User = require(join(__dirname, "../model/userModel"));


// GET login page
router.get("/", (req, res) => {
  if (res.locals.user) {
    return res.redirect("/error");
  }
  res.render("site/login");
});

// POST login form
router.post("/", async (req, res) => {
  try {
    if (res.locals.user) {
      return res.json({
        case: false,
        message: "You are already logged in"
      });
    }

    let { username, password } = req.body;
    const userControl = await User.find
    ({"username": username, "password": password}).exec();
    console.log(userControl);
    let ID = userControl[0]._id;
    ID = String(ID);
    req.session.userID = ID;
    // You should handle login logic here (e.g., checking username/password)
    // Example:
    // const user = await User.findOne({ username });
    // if (!user || !user.comparePassword(password)) {
    //   return res.json({ case: false, message: "Invalid credentials" });
    // }
    // Otherwise, set session/cookie etc.

    return res.json({
      case: true,
      message: "Login successful (dummy response)"
    });

  } catch (error) {
    console.log(error);
    return res.json({
      case: false,
      message: "An error occurred"
    });
  }
});

module.exports = router;
