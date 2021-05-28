import { Router } from "express";
import { body } from 'express-validator';

import { client } from "../../../..";
import { SendMessageController } from "../../../../controllers/SendMessagesController";

const messagesRoute = Router();

const sendMessageController = new SendMessageController(client);

messagesRoute.post( 
  "/", 
  body("guildId").isString(), 
  body("channelId").isString(), 
  body("message").notEmpty(), 
  sendMessageController.handle 
);

export { messagesRoute };