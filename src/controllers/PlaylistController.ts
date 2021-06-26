import { PlaylistRepository } from "../database/PlaylistRepository";

class PlaylistController {
  playlistRepository: PlaylistRepository;
  
  constructor() {
    this.playlistRepository = new PlaylistRepository();
  }

  async create(name: string, song: string) {
    return { name, song };
  }

  async remove(name: string, song: string) {
    return this.playlistRepository.remove(name, song);
  }

  async show(name: string) {
    return this.playlistRepository.show(name);
  }
}

export { PlaylistController };