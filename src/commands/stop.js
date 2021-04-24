const { MessageEmbed } = require("discord.js");

module.exports = async (client, message, args, music) => {
  return music.stop();
}