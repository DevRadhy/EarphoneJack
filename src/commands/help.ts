import fs from "fs";
import { Client, MessageEmbed } from "discord.js";
import { ICommandsProps } from "../DTO/CommandsDTO";

const getClientAvatarURL = (client: Client) => {
  const avatarUrl = client.user?.avatarURL();
  return avatarUrl ? String(avatarUrl) : String(client.user?.defaultAvatarURL);
};

export const help = async ({ client, message }: ICommandsProps) => {
  const embed = new MessageEmbed();
  const clientAvatarUrl = getClientAvatarURL(client);

  embed.setColor('#ffd596');
  embed.setTitle('EarphoneHelp');
  embed.setDescription('Comandos do EarphoneJack');
  embed.setAuthor(client.user?.username, clientAvatarUrl);
  embed.setThumbnail(clientAvatarUrl);

  const files = fs.readdirSync(__dirname);
  files.map((file) => {
    const module = require(`./${file}`);
    const { name, description } = module.details;
    embed.addField(`${name.toUpperCase()}`, description);
  });

  embed.setFooter(`Requested by ${message.author.tag}`, String(message.author.avatarURL()));
  embed.setTimestamp();

  return message.channel.send(embed);
};

export const details = {
  name: 'help',
  description: 'Mostra todos os comandos do BOT.',
  alias: ['ajuda'],
};
