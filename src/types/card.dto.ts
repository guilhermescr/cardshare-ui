import { CommentDto } from './comment.dto';

export interface RelatedCard {
  id: string;
  title: string;
  ownerUsername: string;
}

export interface CardDto {
  id: string;
  title: string;
  description: string;
  ownerUsername: string;
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
