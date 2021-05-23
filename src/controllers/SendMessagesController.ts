import { Client, EmojiIdentifierResolvable, Message } from "discord.js";
import { Request, Response } from "express";

interface IRequest {
  channel: string
  message: string[]
  reactions: EmojiIdentifierResolvable[]
}

class SendMessageController {
  private client

  constructor(
    client: Client
  ){
    this.client = client;
  }

  handle = async (request: Request, response: Response) => {

    const {
      channel,
      message,
      reactions
    } = request.body as IRequest;

    //@ts-ignore
    const channelSelected = this.client.channels.cache.find(channelObject => channelObject.name === channel);
  
    const formatMessage = message.join("\n");
  
    //@ts-ignore
    const messageResponse = await channelSelected.send(formatMessage) as Message;
  
    const reactionsResponse = reactions.map(reaction => messageResponse.react(reaction));
  
    await Promise.all(reactionsResponse);
  
    
    return response.send();
  }
}

export { SendMessageController };