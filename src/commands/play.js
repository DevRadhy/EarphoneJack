const { MessageEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const { playlist } = require('../controllers/MusicController');
const { seachVideos } = require('../utils/YoutubeUtils');

module.exports = async (client, message, args, music) => {
  if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");
  
  let url = args[0];

  if(!ytdl.validateURL(args[0])) {
    const argsQuery = message.content.slice(9).trim();

    const videos = await seachVideos(argsQuery);

    const embed = new MessageEmbed()

    embed.setColor('#ffd596')
    embed.setTitle('Escolha uma música.')
    embed.setDescription('Escolha um número de 1-10')

    videos.map((song, index) => {
      embed.addField(`${index + 1}. ${song.title}`, song.title);
    });

    embed.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
    embed.setTimestamp()

    message.channel.send(embed);
    
    ytdl.validateID(videos[0].video_id);

    url = `https://youtube.com/watch?v=${videos[0].video_id}`;
  }
  
  playlist.push(url);

  if(playlist.length <= 1) {
    await music.play();
  }
}