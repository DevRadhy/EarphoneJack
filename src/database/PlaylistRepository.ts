import { getRepository, Repository } from "typeorm";
import { queue } from "../controllers/MusicController";
import { Playlist } from "../models/Playlist";
import { Song } from "../models/Song";

interface SongProps {
  name: string;
  author: string;
  video_id: string;
}

export class PlaylistRepository {
  private playlistRepository: Repository<Playlist>
  private songsRepository: Repository<Song>

  constructor() {
    this.playlistRepository = getRepository(Playlist);
    this.songsRepository = getRepository(Song);
  }

  async create(playlist: Playlist, song: SongProps) {
    const playlistAlreadyExists = await this.playlistRepository.findOne({
      where: { name: playlist.name, guild_id: playlist.guild_id }
    });

    if(!playlistAlreadyExists) {
      const { id } = await this.playlistRepository.save(playlist);

      const playlist_id = String(id);

      return this.addSong({
        playlist_id,
        video_id: song.video_id,
        name: song.name,
        author: song.author,
      });
    }

    const playlist_id = String(playlistAlreadyExists?.id);

    return this.addSong({
      playlist_id,
      video_id: song.video_id,
      name: song.name,
      author: song.author,
    });
  }

  async addSong(song: Song) {
    const musicHasAlreadyBeenAdded = await this.songsRepository.findOne({
      where: { playlist_id: song.playlist_id, name: song.name },
    });

    if(musicHasAlreadyBeenAdded) return;

    return this.songsRepository.insert(song);
  }

  async get(name: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { name },
    });

    if(!playlist) return;

    const songs = await this.songsRepository.find({
      where: { playlist_id: playlist.id }
    });

    return songs.map((song) => {
      queue.push({
        video_id: song.video_id,
        title: song.name,
        author: song.author,
      });
    });
  }

  async show(name: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { name },
    });

    if(!playlist) return;

    const songs = await this.songsRepository.find({
      where: { playlist_id: playlist.id }
    });

    return songs;
  }

  async remove(playlist_name: string, song: string) {
    const playlist = await this.playlistRepository.findOne({
      where: { name: playlist_name },
    });

    if(!playlist) return;

    const musicAlreadyExist = await this.songsRepository.findOne({
      where: { playlist_id: playlist.id, video_id: song },
    });

    if(!musicAlreadyExist) return;

    return this.songsRepository.remove(musicAlreadyExist);
  }
}