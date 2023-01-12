import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { NewComment } from './dto/new-comment.dto';

@Injectable()
export class AppService {
  constructor(
    @Inject('QUERY_SERVICE') private readonly queryService: ClientProxy,
  ) {
    this.queryService.connect();
  }

  async moderateComment(data: NewComment) {
    let comment = {
      ...data,
      status: 'approved',
    };
    if (data.comment.includes('orange')) {
      comment.status = 'rejected';
    }
    await lastValueFrom(this.queryService.emit('comments.new', comment));
  }
}
