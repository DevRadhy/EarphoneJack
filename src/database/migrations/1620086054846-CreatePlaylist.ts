import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePlaylist1620086054846 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'playlist',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'video_id',
          type: 'varchar',
        },
        {
          name: 'guild_id',
          type: 'varchar',
        },
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('playlist');
  }

}
