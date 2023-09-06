const router = require("express").Router();
const connection = require("../../database/apiConnexion");

console.log("Image");

router.get("/", (req, res) => {
  const sql = "SELECT * FROM image";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
