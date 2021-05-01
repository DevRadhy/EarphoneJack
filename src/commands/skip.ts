import { ICommandsProps } from "../DTO/CommandsDTO";

const { MessageEmbed } = require("discord.js");

export = async ({ message, music }: ICommandsProps) => {
  await music.skip();

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Música pulada!');

  return message.channel.send(embed);
};