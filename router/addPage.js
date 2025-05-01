const express = require('express');
const router = express.Router();
const {join} = require('path');
const Content = require(join(__dirname, "..", "model", "contentModel.js"));
router.get("/", (req, res) => {
  if (!res.locals.user) {
    return res.redirect("error");
  }
  return res.render("site/add");
});

router.post("/", (req, res) => {
  try {
    if (!res.locals.user) {
      return res.json({
        case: false,
        message: "User not found"
      });
    }

    if (!req.body || !req.files) {
      return res.json({
        case: false,
        message: "File or body data not provided"
      });
    }

    const { title, content, name } = req.body;
    const { file } = req.files;

    if (!title || !content || !name || !file) {
      return res.json({
        case: false,
        message: "Missing required fields"
      });
    }
    if(file.size > 1024 * 1024 * 10) {
      return res.json({
        case: false,
        message: "File size exceeds limit"
      });
    }
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      const extension = file.mimetype.split("/")[1];
      const uniqueName = `${Date.now()}.${extension}`;
      console.log(uniqueName);
      return res.json({
        case: true,
        message: "File uploaded successfully",
        filePath: `uploads/${uniqueName}`
      }); 
    }
    else {
      return res.json({
        case: false,
        message: "File type not allowed"
      });
    }

 

  } catch (e) {
    console.log(e);
    return res.json({
      case: false,
      message: "Error"
    });
  }
});

module.exports = router;
