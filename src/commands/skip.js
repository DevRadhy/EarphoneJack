module.exports = async (client, message, args, music) => {
  await music.skip();
  return message.channel.send("A música foi pulada!");
}