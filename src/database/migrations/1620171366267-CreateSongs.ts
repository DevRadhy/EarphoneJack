import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSongs1620171366267 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'songs',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'playlist_id',
          type: 'varchar',
        },
        {
          name: 'video_id',
          type: 'varchar',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'author',
          type: 'varchar',
        }
      ],
      foreignKeys: [
        {
          columnNames: [ 'playlist_id' ],
          referencedColumnNames: [ 'id' ],
          referencedTableName: 'playlist',
          onDelete: 'CASCADE',
        }
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('songs');
  }

}
