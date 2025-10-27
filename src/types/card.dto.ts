import { CommentDto } from './comment.dto';

export interface AuthorDto {
  id: string;
  username: string;
  profilePicture: string;
}

export interface RelatedCard {
  id: string;
  title: string;
  author: AuthorDto;
}

export interface CardDto {
  id: string;
  title: string;
  description: string;
  author: AuthorDto;
  visibility: 'public' | 'private' | 'unlisted';
  isLiked: boolean;
  isFavorited: boolean;
  likes: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CardsResponse {
  items: CardDto[];
  nextCursor?: string;
}

export interface CardDetailsDto extends CardDto {
  comments: CommentDto[];
}
