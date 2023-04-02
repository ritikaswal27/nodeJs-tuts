const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/index", (req, res) => {
  const finalPath = path.join(__dirname, "..", "views", "subdir", "index.html");
  console.log(finalPath);
  res.sendFile(finalPath);
});

router.get("/test(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"));
});

module.exports = router;
