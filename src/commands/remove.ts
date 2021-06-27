import { Message, MessageEmbed } from "discord.js";
import { queue } from "../controllers/MusicController";
import { PlaylistController } from "../controllers/PlaylistController";
import { ICommandsDetails, ICommandsProps } from "../DTO/CommandsDTO";

export const remove = async ({ message, args }: ICommandsProps) => {
  if(!args[0]) return message.reply('Desculpe, você precisa indicar a música há ser removida');
  
  if(args[0] !== "playlist" && Number(args[0]) <= queue.length) {
    const dequeue = queue.splice(Number(args[0]) - 1, 1);

    return message.channel.send(`Música **${dequeue[0].title}** removida da lista de reprodução`);
  }

  const playlistController = new PlaylistController();
  const songs = await playlistController.show(args[0]);

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
  
    if(!song) return message.reply('Desculpe, você precisa fornecer o número da música');
  
    await playlistController.remove(args[0], song.video_id);

    return message.channel.send(`Música **${song.name}** removida da playlist **${args[0]}**.`);
  });

};

export const details: ICommandsDetails = {
  name: 'remove',
  description: 'Escolha uma música para ser removida de playlist passando o nome da playlist, ou passando o número da música a ser removida da lista de reprodução atual.',
  alias: [ 'remover' ],
  enable: true,
};