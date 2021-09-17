var express = require("express");
var router = express.Router();
const cloudinary = require("cloudinary");

/* POST - Uploads image to cloudinary  */
router.post("/", function (req, res, next) {
  cloudinary.v2.uploader.upload(
    "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
    { public_id: "olympic_flag" },
    function (error, result) {
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
