const Router = require('express').Router;
const router = new Router();
const chatController = require("../controllers/chat-controller");

router.ws('/chat', chatController.chating);

module.exports = router;