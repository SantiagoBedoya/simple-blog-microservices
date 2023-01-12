import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  comment: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}
