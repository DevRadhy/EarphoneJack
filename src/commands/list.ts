import { MessageEmbed } from "discord.js";
import ytdl from 'ytdl-core';
import { playlist } from "../controllers/MusicController";
import { ICommandsProps } from "../DTO/CommandsDTO";

export = async ({ message }: ICommandsProps) => {
  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Aqui está a playlist');

  for(let i = 0; i < playlist.length; i++) {
    const songInfo = await ytdl.getInfo(playlist[i]);

    embed.addField(`${i + 1}. ${songInfo.videoDetails.title}`, songInfo.videoDetails.author.name);
  }

  embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
  embed.setTimestamp();

  return message.channel.send(embed);
};

/**
 * {
 *  name: 'list',
 *  description: 'Mostra as músicas na fila.',
 *  alias: [ 'playlist', 'queue' ]
 * }
 */