import { ICommandsProps } from "../DTO/CommandsDTO";

const { MessageEmbed } = require("discord.js");

export const skip = async ({ message, args, music }: ICommandsProps) => {
  const toMusicNumber = Number(args[0]);

  await music.skip(toMusicNumber);

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Música pulada!');

  return message.channel.send(embed);
};

export const details = {
  name: 'skip',
  description: 'Pula para a proxima música',
  alias: [ 'pular', 'proxima' ],
};
