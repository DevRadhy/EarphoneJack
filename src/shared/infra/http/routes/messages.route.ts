import { Router } from "express";
import { body } from 'express-validator';

import { client } from "../../../..";
import { SendMessageController } from "../../../../controllers/SendMessagesController";

const messagesRoute = Router();

const sendMessageController = new SendMessageController(client);

messagesRoute.post( 
  "/", 
  body("serverId").isString(), 
  body("channel").isString(), 
  body("message").isArray({
    min: 1
  }), 
  sendMessageController.handle 
);

export { messagesRoute };