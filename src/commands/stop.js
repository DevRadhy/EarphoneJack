module.exports = async (client, message, args, music) => {
  await music.stop();
  return message.channel.send("A festa acabou que pena");
}