import { Message, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import { PlaylistRepository } from '../database/PlaylistRepository';
import { ICommandsDetails, ICommandsProps } from '../DTO/CommandsDTO';
import { addToPlaylist } from '../utils/AddToPlaylist';
import { getVideoId } from '../utils/GetVideoId';
import { seachVideos } from '../utils/YoutubeUtils';

const config = require('../../config.json');

export const play = async ({ message, args, music }: ICommandsProps) => {
  let url = args[0];

  if(args[0] === 'playlist') {
    const playlistRepository = new PlaylistRepository();

    await playlistRepository.get(args[1]);

    const embed = new MessageEmbed();

    embed.setColor('#ffd596');
    embed.setTitle(`Playlist`);
    embed.setDescription(`Playlist ${args[1]} adicionada a fila`);
    embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
    embed.setTimestamp();

    message.channel.send(embed);

    return music.play();
  }
  
  if(!ytdl.validateURL(url)) {
    const argsQuery = message.content.slice(config.prefix.length).replace("play", "").trim();

    console.log(argsQuery);

    const videos = await seachVideos(argsQuery);

    const embed = new MessageEmbed();

    embed.setColor('#ffd596');
    embed.setTitle('Escolha uma música.');
    embed.setDescription('Escolha um número de 1-10');

    videos.map((song: { title: string, author: string }, index: number) => {
      embed.addField(`${index + 1}. ${song.title}`, song.author);
    });

    embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
    embed.setTimestamp();

    message.channel.send(embed);

    const interector = [...Array(10).keys()];
    const filter = (reply: Message) => interector.includes(Number(reply.content) - 1);

    const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });

    collector.on('collect', (reply: Message) => {
      const songIndex = Number(reply.content) - 1;

      url = videos[songIndex].video_id;

      addToPlaylist(url, message, music);
    });
  }else {
    const video_id = getVideoId(url);

    if(!video_id) return message.reply('Desculpe, você precisa fornecer uma URL válida');
    
    addToPlaylist(video_id, message, music);
  }
};

export const details: ICommandsDetails = {
  name: 'play',
  description: 'Coloque um link ou pesquise um música, escolha uma de 1 a 10 pra ser adicionada a playlist.',
  alias: [ 'tocar' ],
  enable: true,
};
