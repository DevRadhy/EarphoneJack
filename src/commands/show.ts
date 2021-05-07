import { MessageEmbed } from "discord.js";
import { PlaylistRepository } from "../database/PlaylistRepository";
import { ICommandsProps } from "../DTO/CommandsDTO";

export const show = async ({ message, args }: ICommandsProps) => {
  if(!args[0]) return message.reply('Desculpe, você precisa fornecer o nome da playlist.');

  const playlistRepository = new PlaylistRepository();
  const playlist = await playlistRepository.show(args[0]);

  if(!playlist) return message.reply(`Desculpe, playlist ${args[0]} não existe.`);

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle(`Aqui está a playlist ${args[0]}`);

  playlist.map((song, index) => {
    embed.addField(`${index + 1}. ${song.name}`, song.author);
  });

  embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
  embed.setTimestamp();

  return message.channel.send(embed);
};

export const details = {
  name: 'show',
  description: 'Mostra as músicas da playlist.',
  alias: [ 'ver', 'mostrar' ],
};
