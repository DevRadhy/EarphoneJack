import { Router } from "express";
import { client } from "../../../..";
import { SendMessageController } from "../../../../controllers/SendMessagesController";

const messagesRoute = Router();

const sendMessageController = new SendMessageController(client);

messagesRoute.post("/", sendMessageController.handle);

export { messagesRoute };