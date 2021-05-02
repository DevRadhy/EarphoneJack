import { ICommandsProps } from "../DTO/CommandsDTO";

export const volume = async ({ message, args, music }: ICommandsProps) => {
  if(!args[0] || args[0] > '10' || args[0] < '1') return message.reply("Desculpe, você precisa escolher um número de 1 a 10");
  
  const volume = Number(args[0]) / 20;

  await music.setVolume(volume);

  return message.channel.send(`Volume alterando para ${volume * 200}%`);
};

export const details = {
  name: 'volume',
  description: 'Escolha um número de 1 a 10 pra alterar o volume.',
  alias: [ 'vol' ],
};
