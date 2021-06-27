import { PlaylistRepository } from "../database/PlaylistRepository";
import { SongProps } from "../DTO/MusicsDTO";
import { Playlist } from "../models/Playlist";

class PlaylistController {
  playlistRepository: PlaylistRepository;
  
  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async create(playlist: Playlist, song: SongProps) {
    this.playlistRepository.create(playlist, song);
  }

  async remove(name: string, song: string) {
    return this.playlistRepository.remove(name, song);
  }

  async show(name: string) {
    return this.playlistRepository.show(name);
  }
}

export { PlaylistController };