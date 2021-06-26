import { ICommandsDetails, ICommandsProps } from '../DTO/CommandsDTO';

export const stop = async ({ music }: ICommandsProps) => {
  return music.stop();
};

export const details: ICommandsDetails = {
  name: 'stop',
  description: 'Para a músic e limpa a fila.',
  alias: [ 'parar' ],
  enable: true,
};
