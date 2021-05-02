import { ICommandsProps } from '../DTO/CommandsDTO';

export const stop = async ({ music }: ICommandsProps) => {
  return music.stop();
};

export const details = {
  name: 'stop',
  description: 'Para a músic e limpa a fila.',
  alias: [ 'parar' ],
};
