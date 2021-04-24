require('dotenv').config();

const { Client } = require("discord.js");
const client = new Client();
const config = require("../config.json");
const path = require("path");
const fs = require("fs");

const { MusicController } = require('./controllers/MusicController');

client.commands = {};

const commandsPath = path.join(__dirname, 'commands');

fs.readdir(commandsPath, (err, file) => {
  file.map((file) => {
    const module = require(`./commands/${file}`);
    const command = file.split('.')[0];
    client.commands[command] = module;
  });
})


client.on("ready", () => {
  console.log("Ready!");
})

client.on("message", async message => {
  const msg = require('./events/message');
  msg(client, message);
})

client.login(process.env.SECRET_TOKEN);