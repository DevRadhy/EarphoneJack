import { ICommandsProps } from '../DTO/CommandsDTO';

export = async ({ music }: ICommandsProps) => {
  return music.stop();
};