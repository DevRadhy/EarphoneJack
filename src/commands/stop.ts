import { ICommandsProps } from '../DTO/CommandsDTO';

export = async ({ music }: ICommandsProps) => {
  return music.stop();
};

/**
 * {
 *  name: 'stop',
 *  description: 'Para a músic e limpa a fila.',
 *  alias: [ 'parar' ]
 * }
 */