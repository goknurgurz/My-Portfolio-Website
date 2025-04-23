const express = require('express');
const router = express.Router();

// GET: register page
router.get("/", (req, res) => {
  res.render("site/register");
});

router.post("/", (req, res) => {
  console.log(req.body);
 })
module.exports = router;
