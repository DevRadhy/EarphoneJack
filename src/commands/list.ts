import { MessageEmbed } from "discord.js";
import { queue } from "../controllers/MusicController";
import { ICommandsProps } from "../DTO/CommandsDTO";

export const list = async ({ message }: ICommandsProps) => {
  if(!queue) return message.reply('Desculpe, não há nunhuma música na fila.');

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Aqui está a playlist');

  queue.map((song, index) => {
    embed.addField(`${index + 1}. ${song.title}`, song.author);
  });

  embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
  embed.setTimestamp();

  return message.channel.send(embed);
};

export const details = {
  name: 'list',
  description: 'Mostra as músicas na fila.',
  alias: [ 'playlist', 'queue' ],
};
