import { Injectable } from '@nestjs/common';
import { NewComment } from './dto/new-comment.dto';
import { NewPost } from './dto/new-post.dto';

export interface Comment {
  id: string;
  comment: string;
  status: string;
}
export interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

@Injectable()
export class AppService {
  private posts: Post[] = [];

  getPosts() {
    return this.posts;
  }

  newPost(data: NewPost) {
    this.posts.push({
      ...data,
      comments: [],
    });
    return true;
  }

  newComment(data: NewComment) {
    this.posts = this.posts.map((post) => {
      if (post.id == data.postId) {
        post.comments.push({
          id: data.id,
          comment: data.comment,
          status: data.status,
        });
      }
      return post;
    });

    return true;
  }
}
