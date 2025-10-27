import { AuthorDto } from './card.dto';

export interface CommentDto {
  id: string;
  cardId: string;
  author: AuthorDto;
  content: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}
