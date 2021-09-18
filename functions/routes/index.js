var express = require("express");
var router = express.Router();

/* GET status. */
router.get("/status", function (req, res, next) {
  res.status(200).send({ message: "ok" });
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Expresss" });
});

module.exports = router;
