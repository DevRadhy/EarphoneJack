import { Message, MessageEmbed } from "discord.js";
import { MusicController, queue } from "../controllers/MusicController";
import { getSongInfo } from "./SongInfo";

export async function addToPlaylist(video_id: string, message: Message, music: MusicController) {
  const song = await getSongInfo(video_id);

  queue.push({
    video_id,
    title: song.title,
    author: song.author,
  });

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.addField(`${song.title} Adicionada a playlist!`, song.author);

  message.channel.send(embed);

  if(queue.length <= 1) {
    return music.play();
  }
}