const { ɵflushModuleScopingQueueAsMuchAsPossible } = require("@angular/core");
const messageController = require("../controllers/messagesController");
const express = require("express");
const router = express.Router();

router.post("/store-message", messageController.storeMessage);
