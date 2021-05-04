import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlist')
export class Playlist {
  @PrimaryGeneratedColumn('increment')
  name: string;

  @Column()
  video_id: string;

  @Column()
  guild_id: string;

  constructor(props: Playlist) {
    Object.assign(this, props);
  }
}