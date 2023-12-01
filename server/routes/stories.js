var express = require('express');
var router = express.Router();

var storyController = require('../controllers/storyController');

router.get('/', async function(req, res, next) {
    await storyController.getStories(req, res);
})

router.get('/:story_id', async function(req, res, next) {
    await storyController.getStory(req, res);
})

router.post('/', async function(req, res, next) {
    await storyController.createStory(req, res);
});

router.delete('/:story_id', async function(req, res, next) {
    await storyController.deleteStory(req, res);
})