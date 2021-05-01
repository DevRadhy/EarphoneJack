import { ICommandsProps } from "../DTO/CommandsDTO";

export = async ({ message, args, music }: ICommandsProps) => {
  const volume = Number(args[0]);

  console.log(volume);

  await music.setVolume(volume);

  return message.channel.send(`Volume alterando para ${volume}%`);
};