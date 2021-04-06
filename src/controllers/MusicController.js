class Music {
  message;
  volume = 0.5;
  playlist = [];

  constructor(message) {
    this.message = message;
  }

  async main(command) {
    const connection = await this.message.member.voice.channel.join();
    const dispatcher = !command && connection.play(ytdl(this.playlist[0]), { volume });
  
    dispatcher.on("finish", () => {
        this.playlist.shift();
        this.playlist.length >= 1 ? this.play() : this.message.member.voice.channel.leave();
    });
  
    if(command === "volume") {
      dispatcher.setVolume(this.volume);
    }
  
    if(command === "stop"){
        dispatcher.destroy();
        this.message.member.voice.channel.leave();
    }
  }

  play() {
    this.main();
  }

  skip() {
    this.playlist.shift();
    this.play();
  }

  stop() {
    this.main("stop");
    this.playlist = [];
  }

  setVolume(volume) {
    this.main(volume);
  }
}

module.exports = Music;