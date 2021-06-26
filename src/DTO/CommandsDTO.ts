import { Client, Message } from "discord.js";
import { MusicController } from "../controllers/MusicController";

export interface ICommandsProps {
  client: Client;
  message: Message;
  args: string[];
  music: MusicController;
}

export interface ICommands {
  [command: string]: {
    details: ICommandsDetails;
    // eslint-disable-next-line no-unused-vars
    execute: (props: ICommandsProps) => void;
  }
}

export interface ICommandsDetails {
  name: string;
  description: string;
  alias: string[];
  enable: boolean;
}