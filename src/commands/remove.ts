import { Message, MessageEmbed } from "discord.js";
import { PlaylistRepository } from "../database/PlaylistRepository";
import { ICommandsProps } from "../DTO/CommandsDTO";

export const remove = async ({ message, args }: ICommandsProps) => {
  const [ playlist ] = args;
  if(!playlist) return message.reply('Desculpe, você precisa indicar a música  há ser removida');

  const playlistRepository = new PlaylistRepository();
  const songs = await playlistRepository.show(playlist);

  if(!songs) return message.reply(`Desculpe, playlist **${args[0]}** não existe.`);

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle(`Aqui está a playlist ${args[0]}`);

  songs.map((song, index) => {
    embed.addField(`${index + 1}. ${song.name}`, song.author);
  });

  embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
  embed.setTimestamp();

  message.channel.send(embed);

  const interector = [...Array(songs.length).keys()];
  const filter = (reply: Message) => interector.includes(Number(reply.content) - 1);

  const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });

  collector.on('collect', async (reply: Message) => {
    const songIndex = Number(reply.content) - 1;

    const song = songs.find((song, index) => index === Number(songIndex));
  
    if(!song) return message.reply('Desculpe, você precisa fornecer um id de música válido');
  
    await playlistRepository.remove(playlist, song.video_id);

    return message.channel.send(`Música **${song.name}** removida da playlist **${playlist}**.`);
  });

};

export const details = {
  name: 'remove',
  description: 'Escolha uma música para ser removid da playlist.',
  alias: [ 'remover' ],
};