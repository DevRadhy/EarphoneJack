const { MessageEmbed } = require("discord.js");
const ytdl = require('ytdl-core');
const { playlist } = require("../controllers/MusicController");

module.exports = async (client, message) => {
  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Aqui está a playlist');

  for(let i = 0; i < playlist.length; i++) {
    const songInfo = await ytdl.getInfo(playlist[i]);

    embed.addField(`${i + 1}. ${songInfo.videoDetails.title}`, songInfo.videoDetails.author.name);
  }

  embed.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
  embed.setTimestamp();

  return message.channel.send(embed);
};