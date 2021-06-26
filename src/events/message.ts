import { Client, Message } from "discord.js";
import { MusicController } from "../controllers/MusicController";
import { ICommands } from "../DTO/CommandsDTO";

const config = require('../../config.json');

export = (client: Client, message: Message, commands: ICommands) => {
  // Iguinore todos os bots
  if (message.author.bot) return;

  // Iguinore menssagens diretas
  if(message.channel.type == "dm") return;

  // Ignorar as mensagens que não começam com o prefixo (em config.json)
  if (message.content.indexOf(config.prefix) !== 0) return;

  //  Verifica se o usuário está em um canal de voz para usar os comandos
  if(!message.member?.voice.channel) return message.reply("Desculpe, você precisa estar em um canal de voz");

  // Nossa definição de nome de argumento / comando padrão. 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = String(args.shift()).toLowerCase();

  // Inicia o controller de músicas
  const music = new MusicController(message);

  // Pega os dados do comando do commands
  const cmd = commands[command];

  // Se esse comando não existir ou não estiver habilitado, silenciosamente saia e não faça nada
  if (!cmd || !cmd.details.enable) return;

  // Execute o comando
  cmd.execute({ client, message, args, music });
};