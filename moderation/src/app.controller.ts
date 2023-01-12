import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { NewComment } from './dto/new-comment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('comments.new')
  moderateComment(@Payload() data: NewComment) {
    return this.appService.moderateComment(data);
  }
}
