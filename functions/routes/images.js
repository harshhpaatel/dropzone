var express = require("express");
var router = express.Router();
const cloudinary = require("cloudinary");
var fetch = require("node-fetch");

const CLOUDINARY_STATUS_ENDPOINT =
  "https://status.cloudinary.com/api/v2/status.json";

const SHORT_URL_HOST = "https://go.dradh.com";

/* GET - Health status of imaging service  */
router.post("/status", async function (req, res, next) {
  const response = await fetch(CLOUDINARY_STATUS_ENDPOINT);
  const data = await response.json();

  if ((await data.status?.description) === "All Systems Operational") {
    res.status(200).send(data);
  } else {
    res.status(500).send(data);
  }
});

/* POST - Uploads image to cloudinary  */
router.post("/", function (req, res, next) {
  const data = {
    image: req.body.image,
    public_id: req.body.public_id ? req.body.public_id : null,
  };
  cloudinary.v2.uploader.upload(
    data.image,
    { public_id: data.public_id ? data.public_id : null },
    async function (error, result) {
      if (error) {
        res.send(error);
      } else {
        // Create a short-friendly url
        const url_body = {
          url: result.secure_url,
          customext: "",
        };
        const response = await fetch(`${SHORT_URL_HOST}/api/shorten`, {
          method: "post",
          body: JSON.stringify(url_body),
          headers: { "Content-Type": "application/json" },
        });
        const response_data = await response.json();

        // Return object
        return_data = {
          public_id: result.public_id,
          url: result.url,
          secure_url: result.secure_url,
          friendly_url: `${SHORT_URL_HOST}/${await response_data.hash}`,
        };
        res.send(return_data);
      }
    }
  );
});

/* DELETE - Uploads image to cloudinary  */
router.delete("/:id", function (req, res, next) {
  const data = {
    public_id: req.params.id ? req.params.id : null,
  };
  cloudinary.uploader.destroy(data.public_id, function (error, result) {
    if (error) {
      res.send(error);
    } else {
      res.send(result);
    }
  });
});

module.exports = router;
