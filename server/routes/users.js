var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

router.get("/:username", async function (req, res, next) {
	await userController.getUser(req, res);
})

router.post("/", async function (req, res, next) {
	await userController.createUser(req, res);
});

module.exports = router;
