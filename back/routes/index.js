const router = require("express").Router();

const apiImg = require("./image");

router.use("/image", apiImg);

router.get("/", (req, res) => {
  res.send(JSON.stringify("APÏ operational"));
});

console.log("Router");

module.exports = router;
