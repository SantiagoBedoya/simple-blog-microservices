import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomBytes } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('MODERATE_SERVICE') private readonly moderateService: ClientProxy,
  ) {
    this.moderateService.connect();
  }

  private comments: Comment[] = [];

  async create(createCommentDto: CreateCommentDto) {
    const id = randomBytes(4).toString('hex');

    const comment = {
      id,
      ...createCommentDto,
    };

    await lastValueFrom(this.moderateService.emit('comments.new', comment));
    this.comments.push(comment);

    return comment;
  }

  findAll(postId?: string) {
    if (!postId) throw new BadRequestException('queryParam required (post_id)');

    return this.comments.filter((comment) => comment.postId == postId);
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
