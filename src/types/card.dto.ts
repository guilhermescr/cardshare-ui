import { CardGradient } from '@/constants/card-gradients';
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
  gradient: CardGradient;
}

export interface CardDto {
  id: string;
  title: string;
  description: string;
  mediaUrls: string[];
  visibility: 'public' | 'private' | 'unlisted';
  author: AuthorDto;
  isLiked: boolean;
  isFavorited: boolean;
  likes: string[];
  favorites: string[];
  tags: string[];
  category: string;
  gradient: CardGradient;
  allowComments: boolean;
  allowDownloads: boolean;
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

export interface GeneratedCardResponse {
  title: string;
  description: string;
  category: string;
  gradient: CardGradient;
  visibility: 'public' | 'private' | 'unlisted';
  allowComments: boolean;
  tags: string[];
}
