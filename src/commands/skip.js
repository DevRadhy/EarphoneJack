const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args, music) => {
  await music.skip();

  const embed = new MessageEmbed()

  embed.setColor('#ffd596')
  embed.setTitle('Música pulada!')
  embed.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
  embed.setTimestamp()

  return message.channel.send("A música foi pulada!");
}