var express = require("express");
var router = express.Router();

var loginController = require("../controllers/loginController");

router.post("/", async function (req, res, next) {
	await loginController.loginUser(req, res);
});

module.exports = router;
