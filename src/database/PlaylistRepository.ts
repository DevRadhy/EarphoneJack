import { getRepository } from "typeorm";
import { Playlist } from "../models/Playlist";

export class PlaylistRepository {
  async create(queue: Playlist) {
    const playlistRepository = getRepository(Playlist);

    const musicAlreadyBeenAdded = playlistRepository.findOne({
      where: `video_id = '${queue.video_id}'`
    });

    if(!musicAlreadyBeenAdded) return;

    await playlistRepository.save(queue);
  }
}