import { ICommandsProps } from "../DTO/CommandsDTO";

export const volume = async ({ message, args, music }: ICommandsProps) => {
  const volume = Number(args[0]);

  if(!args[0] || volume < 1 || volume > 10) return message.reply("Desculpe, você precisa escolher um número de 1 a 10");

  await music.setVolume(volume / 20);

  return message.channel.send(`Volume alterando para ${volume * 10}%`);
};

export const details = {
  name: 'volume',
  description: 'Escolha um número de 1 a 10 pra alterar o volume.',
  alias: [ 'vol' ],
};
