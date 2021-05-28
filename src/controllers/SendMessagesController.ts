import { Client, EmojiIdentifierResolvable, Message } from "discord.js";
import { Request, Response } from "express";
import { validationResult } from 'express-validator';

interface IRequest {
  guildId: string
  channelId: string
  userId: string
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
      guildId,
      channelId,
      userId,
      message,
      reactions
    } = request.body as IRequest;
    
    const guild = await this.client.guilds.cache.find(guild => guild.id === guildId);

    const channelSelected = guild?.client.channels.cache.find(channelObject => channelObject.id === channelId );

    const userIsValid = guild?.client.users.cache.find(user => user.id === userId);

    if(!userIsValid){
      return response.status(401).json({
        errors: "User is invalid!"
      });
    }

    const user = guild?.member(userIsValid);
    
    //@ts-ignore
    const roleIsValid = channelSelected.permissionOverwrites.some(roleChannel => user._roles.some(role => role === roleChannel.id));
    
    if(!roleIsValid){
      return response.status(401).json({
        error: "Role is invalid!"
      });
    }
  
    const formatMessage = (typeof message === "string") ? message : message.join("\n");

    //@ts-ignore
    const messageResponse = await channelSelected.send(formatMessage) as Message;
  
    const reactionsResponse = reactions.map(reaction => messageResponse.react(reaction));
  
    await Promise.all(reactionsResponse);
  
    
    return response.status(201).json({
      message: "Message sent successfully"
    });
  }
}

export { SendMessageController };
