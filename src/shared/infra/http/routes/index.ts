import { Router } from "express";
import { messagesRoute } from "./messages.route";

const routes = Router();

routes.use("/sendMessages" ,messagesRoute);

export { routes };