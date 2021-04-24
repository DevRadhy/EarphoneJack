const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args, music) => {
  await music.stop();

  const embed = new MessageEmbed()

  embed.setColor('#ffd596')
  embed.setTitle('Que pena, a festa acabou.')
  embed.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
  embed.setTimestamp()


  return message.channel.send(embed);
}