import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async saveMessage(data: {
    sender: string;
    receiver: string;
    message: string;
  }) {
    return this.prisma.message.create({
      data: {
        sender: data.sender,
        receiver: data.receiver,
        message: data.message,
      },
    });
  }
}
