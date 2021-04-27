const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args, music) => {
  await music.skip();

  const embed = new MessageEmbed();

  embed.setColor('#ffd596');
  embed.setTitle('Música pulada!');

  return message.channel.send(embed);
};