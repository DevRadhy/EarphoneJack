import { Message, MessageEmbed } from 'discord.js';
import ytdl from 'ytdl-core';

interface QueueProps {
  video_id: string;
  title: string;
  author: string;
}

let queue: QueueProps[] = [];
let volume = 0.5;

class MusicController {
  private message: Message;

  constructor(message: Message) {
    this.message = message;
  }

  async getConnection() {
    const connection = await this.message.member?.voice.channel?.join();

    return connection;
  }

  async play() {
    const connection = await this.getConnection();

    const play = `https://youtube.com/watch?v=${queue[0].video_id}`;

    const dispatcher = connection?.play(ytdl(play, { quality: 'highestaudio', filter: 'audioonly' }), { volume });

    const { title, author } = queue[0];

    const embed = new MessageEmbed();

    embed.setColor('#ffd596');
    embed.setTitle('Tocando agora');
    embed.addField(title, author);

    this.message.channel.send(embed);
  
    dispatcher?.on('finish', () => {
      queue.shift();
      queue.length >= 1 ? this.play() : this.stop();
    });
  }

  async skip(to?: number) {
    const connection = await this.getConnection();

    to && queue.splice(0, to - 2);

    connection?.dispatcher?.end();
  }

  async stop() {
    queue = [];
    this.message.member?.voice.channel?.leave();

    const embed = new MessageEmbed();

    embed.setColor('#ffd596');
    embed.setTitle('Que pena, a festa acabou.');
    embed.addField('Se quiser começar novamente, basta usar o comando', 'jiro.play <music>');

    return this.message.channel.send(embed);
  }

  async setVolume(newVolume: number) {
    const connection = await this.getConnection();

    volume = newVolume;

    connection?.dispatcher?.setVolume(newVolume);
  }
}

export { MusicController, queue };