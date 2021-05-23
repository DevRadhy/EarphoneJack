import { Client, EmojiIdentifierResolvable, Message } from "discord.js";
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

interface IRequest {
  serverId: string
  channel: string
  message: string[] | string
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

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const {
      serverId,
      channel,
      message,
      reactions
    } = request.body as IRequest;

    const channelSelected = this.client.channels.cache.find(channelObject => 
      //@ts-ignore      
      channelObject.name === channel  
      //@ts-ignore
      && channelObject.guild.id === serverId
    );
  
    const formatMessage = (typeof message === "string") ? message : message.join("\n");
  
    //@ts-ignore
    const messageResponse = await channelSelected.send(formatMessage) as Message;
  
    const reactionsResponse = reactions.map(reaction => messageResponse.react(reaction));
  
    await Promise.all(reactionsResponse);
  
    
    return response.send();
  }
}

export { SendMessageController };