import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { randomBytes } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject('QUERY_SERVICE') private readonly queryService: ClientProxy,
  ) {
    this.queryService.connect();
  }
  private posts: Record<string, Post> = {};

  async create(createPostDto: CreatePostDto) {
    const id = randomBytes(4).toString('hex');

    const post = {
      id,
      ...createPostDto,
    };
    this.posts[id] = post;

    await lastValueFrom(this.queryService.emit('posts.new', post));

    return this.posts[id];
  }

  findAll() {
    return Object.values(this.posts);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
