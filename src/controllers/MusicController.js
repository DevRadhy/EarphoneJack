const ytdl = require('ytdl-core');

let playlist = [];
let volume = 0.5;

class Music {
  message;

  constructor(message) {
    this.message = message;
  }

  async main(command) {
    const connection = await this.message.member.voice.channel.join();
    const dispatcher = connection.play(ytdl(playlist[0]), { volume, quality: 'highestaudio' });
  
    dispatcher.on("finish", () => {
        playlist.shift();
        playlist.length >= 1 ? this.play() : this.message.member.voice.channel.leave();
    });
  
    if(command === "volume") {
      dispatcher.setVolume(volume);
    }
  
    if(command === "stop"){
        dispatcher.destroy();
        this.message.member.voice.channel.leave();
    }
  }

  async play() {
    await this.main();
    const info = await ytdl.getInfo(playlist[0])

    return {
      title: info.videoDetails.title,
      author: info.videoDetails.author,
    }
  }

  skip() {
    playlist.shift();
    this.play();
  }

  stop() {
    this.main("stop");
    playlist = [];
  }

  setVolume(newVolume) {
    volume = newVolume;
    this.main("volume");
  }
}

module.exports = {
  MusicController: Music,
  playlist,
};