const { MusicController } = require("../controllers/MusicController");

module.exports = (client, message) => {
  // Iguinore todos os bots
  if (message.author.bot) return;

  // Iguinore menssagens diretas
  if(message.channel.type == "dm") return;

  // Ignorar as mensagens que não começam com o prefixo (em config.json)
  if (message.content.indexOf('jiro.') !== 0) return;

  //  Verifica se o usuário está em um canal de voz para usar os comandos
  if(!message.member.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");

  // Nossa definição de nome de argumento / comando padrão. 
  const args = message.content.slice(5).trim().split(/ +/g);
  const comando = args.shift().toLowerCase();

  // Inicia o controller de músicas
  const music = new MusicController(message);

  // Pega os dados do comando do client.commands Enmap
  const cmd = client.commands[comando];

  // Se esse comando não existir, silenciosamente saia e não faça nada
  if (!cmd) return;

  // Execute o comando
  cmd(client, message, args, music);
};