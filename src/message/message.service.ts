import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(createMessageDtos: CreateMessageDto[]): Promise<void> {
    await this.prisma.message.createMany({ data: createMessageDtos });
  }

  async findByRecipientAndIdLowerThanEqual(
    id: number,
    recipientId: number,
    page: number,
    size: number,
  ): Promise<Message[]> {
    return this.prisma.message.findMany({
      skip: size * page - size,
      take: size,
      where: {
        id: {
          lte: id,
        },
        recipientId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findAllByRecipientAndIdGreaterThan(
    id: number,
    recipientId: number,
  ): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        id: {
          gt: id,
        },
        recipientId,
      },
      include: {
        sender: true,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getCountByRecipient(recipientId: number): Promise<number> {
    return this.prisma.message.count({
      where: {
        recipientId,
      },
    });
  }

  async getMaxIdByRecipient(recipientId: number): Promise<number> {
    const aggregation = await this.prisma.message.aggregate({
      _max: {
        id: true,
      },
      where: {
        recipientId,
      },
    });
    return aggregation._max.id;
  }

  async updateIsRead(id: number, isRead: boolean): Promise<Message> {
    return this.prisma.message.update({
      where: { id },
      data: {
        isRead,
      },
      include: {
        sender: true,
      },
    });
  }
}
