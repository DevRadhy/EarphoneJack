import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('increment')
  readonly id?: string;

  @Column()
  playlist_id: string;

  @Column()
  video_id: string;

  @Column()
  name: string;

  @Column()
  author: string;

  constructor(props: Song) {
    Object.assign(this, props);
  }
}