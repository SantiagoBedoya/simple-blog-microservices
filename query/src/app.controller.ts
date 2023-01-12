import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';
import { NewComment } from './dto/new-comment.dto';
import { NewPost } from './dto/new-post.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getPosts() {
    return this.appService.getPosts();
  }

  @EventPattern('posts.new')
  newPost(@Payload() data: NewPost, @Ctx() context: RmqContext) {
    return this.appService.newPost(data);
  }

  @EventPattern('comments.new')
  newComment(@Payload() data: NewComment, @Ctx() context: RmqContext) {
    return this.appService.newComment(data);
  }
}
