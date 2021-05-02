import { Message, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import { playlist } from '../controllers/MusicController';
import { ICommandsProps } from '../DTO/CommandsDTO';
import { seachVideos } from '../utils/YoutubeUtils';

const config = require('../../config.json');

export = async ({ message, args, music }: ICommandsProps) => {
  let url = args[0];

  if(!ytdl.validateURL(args[0])) {
    const argsQuery = message.content.slice(config.prefix.length).trim();

    const videos = await seachVideos(argsQuery);

    const embed = new MessageEmbed();

    embed.setColor('#ffd596');
    embed.setTitle('Escolha uma música.');
    embed.setDescription('Escolha um número de 1-10');

    videos.map((song: { title: string }, index: number) => {
      embed.addField(`${index + 1}. ${song.title}`, song.title);
    });

    embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
    embed.setTimestamp();

    message.channel.send(embed);

    const interector = [...Array(10).keys()];
    const filter = (reply: Message) => interector.includes(Number(reply.content) - 1);

    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });

    collector.on('collect', async (reply: Message) => {
      const songIndex = Number(reply.content) - 1;

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

/**
 * {
 *  name: 'play',
 *  description: 'Coloque um link ou pesquise um música, escolha uma de 1 a 10 pra ser adicionada a playlist.',
 *  alias: [ 'tocar' ]
 * }
 */