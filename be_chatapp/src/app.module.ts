import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { PrismaService } from './prisma/prisma.service';
import { ChatService } from './chat/chat.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, PrismaService, ChatService],
})
export class AppModule {}
