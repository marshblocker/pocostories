var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.post("/", async function (req, res, next) {
	await userController.createUser(req, res);
});

module.exports = router;
