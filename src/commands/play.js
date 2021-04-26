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

    const embed = new MessageEmbed();

    embed.setColor('#ffd596');
    embed.setTitle('Escolha uma música.');
    embed.setDescription('Escolha um número de 1-10');

    videos.map((song, index) => {
      embed.addField(`${index + 1}. ${song.title}`, song.title);
    });

    embed.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL());
    embed.setTimestamp();

    message.channel.send(embed);

    const filter = m => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(Number(m.content));
    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });

    collector.on('collect', m => {
      const songIndex = m.content - 1;

      ytdl.validateID(videos[songIndex].video_id);
  
      url = `https://youtube.com/watch?v=${videos[songIndex].video_id}`;

      playlist.push(url);

      const embed = new MessageEmbed();

      embed.setColor('#ffd596');
      embed.setTitle(`${videos[songIndex].title} Adicionada a playlist!`);

      message.channel.send(embed);

      if(playlist.length <= 1) {
        return music.play();
      }
    });
  }else {
    playlist.push(url);
  
    if(playlist.length <= 1) {
      await music.play();
    }
  }
};