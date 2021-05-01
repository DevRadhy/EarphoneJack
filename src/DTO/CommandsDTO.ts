import { Client, Message } from "discord.js";
import { MusicController } from "../controllers/MusicController";

export interface ICommandsProps {
  client: Client;
  message: Message;
  args: string[];
  music: MusicController;
}