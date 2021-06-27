import { MessageEmbed } from "discord.js";
import { PlaylistController } from "../controllers/PlaylistController";
import { ICommandsDetails, ICommandsProps } from "../DTO/CommandsDTO";
import { Playlist } from "../models/Playlist";
import { getVideoId } from "../utils/GetVideoId";
import { getSongInfo } from "../utils/SongInfo";

export const create = async ({ message, args }: ICommandsProps) => {
  const playlistController = new PlaylistController();

  const [name, song] = args;
  const guild_id = String(message.guild?.id);
  const video_id = getVideoId(song);

  if(!video_id) return message.reply('Desculpe, você precisa fornecer uma URL válida');
  
  const music = await getSongInfo(String(video_id));

  const playlist = new Playlist({
    name,
    guild_id,
  });

  await playlistController.create(playlist, {
    video_id,
    name: music.title,
    author: music.author,
  });

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Playlist');
  embed.addField(`${music.title} adicionada com sucesso a playlist ${playlist.name}!`, 'use `jiro.play playlist <name>` para ouvir');

  return message.channel.send(embed);
};

export const details: ICommandsDetails = {
  name: 'create',
  description: 'Cria uma playlist.',
  alias: [ 'criar', 'add', 'adicionar' ],
  enable: true,
};