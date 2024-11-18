import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { ChatMessage } from './chat.types';
import { ChatService } from './chat.service';

@WebSocketGateway(8080, { namespace: '/chats', cors: '*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  private readonly server: Server;

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() data: ChatMessage,
    @ConnectedSocket() client: Socket,
  ) {
    const savedMessage = await this.chatService.saveMessage(data);
    console.log('Message saved:', savedMessage);
    this.server.to(data.receiver).emit('receive_message', savedMessage);
    return { status: 'Message sent', message: savedMessage };
  }

  @SubscribeMessage('join_room')
  async handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    return { status: 'Joined room', room };
  }
}
