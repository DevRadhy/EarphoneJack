const { Client } = require("discord.js");
const client = new Client();
const config = require("../config.json");

const { MusicController, playlist } = require('./controllers/MusicController');

const ytdl = require('ytdl-core');

client.on("ready", () => {
  console.log("Ready!");
})

client.on("message", async message => {
  if(message.author.bot) return
  if(message.channel.type === "dm") return
  if(!message.content.startsWith(config.prefix)) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();

  const Music = new MusicController(message);

  if(command === "play"){
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      if(!ytdl.validateURL(args[0])) return message.reply("Desculpe, você precisa por um link válido");
      
      playlist.push(args[0]);

      if(playlist.length <= 1) {
        Music.play();
      }
  }

  if(command === "stop"){
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      await Music.stop();
      message.channel.send("A festa acabou que pena");
  }

  if(command === "skip"){
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      await Music.skip();
      message.channel.send("A música foi pulada!");
  }

  if(command === "volume") {
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      if(!args[0]) return message.reply("Escolha um número de 1-10");

      const volume = args[0] / 20;
      await Music.setVolume(volume);

      message.channel.send(`Volume alterado para ${volume * 100 / 0.5}%`);
  }
})

client.login(process.env.SECRET_TOKEN);