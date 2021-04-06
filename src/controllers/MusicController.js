const ytdl = require('ytdl-core');

let playlist = [];
let volume = 0.5;

class Music {
  message;

  constructor(message) {
    this.message = message;
  }

  async getConnection() {
    const connection = await this.message.member.voice.channel.join();

    return connection;
  }

  play() {
    const connection = this.getConnection();

    const dispatcher = connection.play(ytdl(playlist[0]), { volume, quality: 'highestaudio' });

    dispatcher.on('start', async () => {
      const info = await ytdl.getInfo(playlist[0]);

      return {
        title: info.videoDetails.title,
        author: info.videoDetails.author.name,
      }
    });
  
    dispatcher.on('finish', () => {
        playlist.shift();
        playlist.length >= 1 ? this.play() : this.message.member.voice.channel.leave();
    });
  }

  async skip() {
    const connection = await this.getConnection();
    connection.dispatcher.end();
  }

  async stop() {
    const connection = await this.getConnection();

    playlist = [];
    connection.dispatcher.end();
  }

  async setVolume(newVolume) {
    volume = newVolume;
  }
}

module.exports = {
  MusicController: Music,
  playlist,
};