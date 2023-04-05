const Router = require('express').Router;
const router = new Router();
const chatService = require("../controllers/chat-controller");

router.ws('/chat', chatService.chating);

module.exports = router;