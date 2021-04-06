const { Client } = require("discord.js");
const client = new Client();
const config = require("../config.json");

const ytdl = require('ytdl-core');

let playlist = [];
let volume = 0.5;

client.on("ready", () => {
  console.log("Ready!");
})

client.on("message", async message => {
  if(message.author.bot) return
  if(message.channel.type === "dm") return
  if(!message.content.startsWith(config.prefix)) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLocaleLowerCase();

  async function Music(command){
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(ytdl(playlist[0]), { volume });
  
    dispatcher.on("finish", () => {
        playlist.shift();
        playlist.length >= 1 ? Music() : message.member.voice.channel.leave();
    });
  
    if(command === "volume") {
      dispatcher.setVolume(volume);
    }
  
    if(command === "stop"){
        dispatcher.destroy();
        message.member.voice.channel.leave();
    }
    
    if(command === "skip"){
      playlist.shift();
      console.log(playlist);
    }
  }

  if(command === "play"){
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      if(!ytdl.validateURL(args[0])) return message.reply("Desculpe, você precisa por um link válido");
      playlist.push(args[0]);
      console.log("new music added!");

      if(playlist.length <= 1) {
        Music();
      }
  }

  if(command === "stop"){
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      Music("stop");
      message.channel.send("A festa acabou que pena");
      playlist = [];
  }

  if(command === "skip"){
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      Music("skip");
      message.channel.send("A música foi pulada!");
  }

  if(command === "volume") {
      if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
      if(!args[0]) return message.reply("Escolha um número de 1-10");

      volume = args[0] / 20;
      Music("volume");

      message.channel.send(`Volume alterado para ${volume * 100 / 0.5}%`);
  }
})

client.login(process.env.SECRET_TOKEN);