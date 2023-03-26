import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from '@prisma/client';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  createMany(@Body() createMessageDtos: CreateMessageDto[]) {
    this.messageService.createMany(createMessageDtos);
  }

  @Get('id/lower-than-equal/:id')
  findByRecipientAndIdLowerThanEqual(
    @Param('id') id: string,
    @Query('recipientId') recipientId: string,
    @Query('page') page: string,
    @Query('size') size: string,
  ): Promise<Message[]> {
    return this.messageService.findByRecipientAndIdLowerThanEqual(
      +id,
      +recipientId,
      +page,
      +size,
    );
  }

  @Get('id/greater-than/:id')
  findAllByRecipientAndIdGreaterThan(
    @Param('id') id: string,
    @Query('recipientId') recipientId: string,
  ): Promise<Message[]> {
    return this.messageService.findAllByRecipientAndIdGreaterThan(
      +id,
      +recipientId,
    );
  }

  @Get('count')
  getCountByRecipient(
    @Query('recipientId') recipientId: string,
  ): Promise<number> {
    return this.messageService.getCountByRecipient(+recipientId);
  }

  @Get('id/max')
  getMaxIdByRecipient(
    @Query('recipientId') recipientId: string,
  ): Promise<number> {
    return this.messageService.getMaxIdByRecipient(+recipientId);
  }

  @Patch(':id/is-read')
  updateIsRead(
    @Param('id') id: string,
    @Body() message: Message,
  ): Promise<Message> {
    return this.messageService.updateIsRead(+id, message.isRead);
  }
}
