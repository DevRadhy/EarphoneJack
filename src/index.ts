import 'reflect-metadata';
import { Client } from "discord.js";
const client = new Client();
import path from "path";
import fs from "fs";
import { ICommands } from "./DTO/CommandsDTO";

import './database/connection';

const commands: ICommands = {};

const commandsPath = path.join(__dirname, 'commands');

fs.readdir(commandsPath, (err, file) => {
  file.map((file) => {
    const module = require(`./commands/${file}`);
    const command = module.details.name;
    commands[command] = module[command];
  });
});

client.on("ready", () => {
  console.log("Ready!");
});

client.on("message", async message => {
  const msg = require('./events/message');
  msg(client, message, commands);
});

client.login(process.env.SECRET_TOKEN);