const { Client } = require("discord.js");
const client = new Client();
const config = require("./config.json");

const ytdl = require('ytdl-core');

let playlist = [];

client.on("ready", () => {
    console.log("Ready!");
})

client.on("message", async message => {
    if(message.author.bot) return
    if(message.channel.type === "dm") return
    if(!message.content.startsWith(config.prefix)) return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    function Music(command){
        message.member.voice.channel.join().then( connection => {
            const dispatcher = connection.play(ytdl(playlist[0]), {volume: 0.5});
            console.log("playing", playlist[0])

            dispatcher.on("finish", () => {
                playlist.shift();
                if(playlist.length >= 1){
                    Music();
                }else{
                    message.member.voice.channel.leave();
                }
            })
            if(command === "stop"){
                dispatcher.destroy();
                message.member.voice.channel.leave();
            }else if(command === "skip"){
                playlist.shift();
            }
        })
    }

    if(command == "play"){
        if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
        if(!ytdl.validateURL(args[0])) return message.reply("Desculpe, você precisa por um link válido");
        playlist.push(args[0]);
        console.log("new music added!");

        Music();
    }
    if(command == "stop"){
        if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
        Music("stop");
        message.channel.send("A festa acabou que pena");
        playlist = [];
    }
    if(command == "skip"){
        if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
        Music("skip");
        message.channel.send("A música foi pulada!");
    }
})

client.login(process.env.SECRET_TOKEN);