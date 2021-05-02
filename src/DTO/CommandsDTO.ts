import { Client, Message } from "discord.js";
import { MusicController } from "../controllers/MusicController";

export interface ICommandsProps {
  client: Client;
  message: Message;
  args: string[];
  music: MusicController;
}

export interface ICommands {
  // eslint-disable-next-line no-unused-vars
  [command: string]: (props: ICommandsProps) => void;
}