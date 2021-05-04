import { MessageEmbed } from "discord.js";
import { PlaylistRepository } from "../database/PlaylistRepository";
import { ICommandsProps } from "../DTO/CommandsDTO";
import { Playlist } from "../models/Playlist";
import { getVideoId } from "../utils/GetVideoId";

export const create = async ({ message, args }: ICommandsProps) => {
  const playlist = new PlaylistRepository();

  const [name, song] = args;
  const guild_id = String(message.guild?.id);
  const video_id = getVideoId(song);

  if(!video_id) return message.reply('Desculpe, você precisa fornecer uma URL válida');

  const queue = new Playlist({ name, video_id, guild_id });

  await playlist.create({
    name: queue.name,
    guild_id: queue.guild_id,
    video_id: queue.video_id,
  });

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Playlist');
  embed.addField(`Música adicionada com sucesso a playlist ${queue.name}!`, 'use `jiro.play playlist <name>` para ouvir');

  return message.channel.send(embed);
};

export const details = {
  name: 'create',
  description: 'Cria uma playlist.',
  alias: [ 'criar', 'add', 'adicionar' ],
};