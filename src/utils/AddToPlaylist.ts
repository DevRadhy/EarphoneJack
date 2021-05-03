import { Message, MessageEmbed } from "discord.js";
import { MusicController, playlist } from "../controllers/MusicController";
import { getSongInfo } from "./SongInfo";

export async function addToPlaylist(url: string, message: Message, music: MusicController) {
  playlist.push(url);

  const song = await getSongInfo(url);

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.addField(`${song.title} Adicionada a playlist!`, song.author);

  message.channel.send(embed);

  if(playlist.length <= 1) {
    return music.play();
  }
}