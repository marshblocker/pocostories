var express = require("express");
var router = express.Router();

var storyController = require("../controllers/storyController");
var ratingController = require("../controllers/ratingController");

router.get("/", async function (req, res, next) {
	if (req.query.username == null) {
		await storyController.getStories(req, res);
	} else {
		await storyController.getUserStories(req, res);
	}
});

router.get("/:story_id", async function (req, res, next) {
	await storyController.getStory(req, res);
});

router.get("/:story_id/ratings", async function (req, res, next) {
	if (req.query.username == null) {
		await ratingController.getRatings(req, res);
	} else {
		await ratingController.getUserRating(req, res);
	}
})

router.post("/", async function (req, res, next) {
	await storyController.createStory(req, res);
});

router.post("/:story_id/ratings", async function (req, res, next) {
	await ratingController.createRating(req, res);
})

router.delete("/:story_id", async function (req, res, next) {
	await storyController.deleteStory(req, res);
});

module.exports = router;