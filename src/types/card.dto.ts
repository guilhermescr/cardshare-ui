export interface CardDto {
  id: string;
  title: string;
  description: string;
  ownerUsername: string;
  visibility: 'public' | 'private' | 'unlisted';
  likes: string[];
  favorites: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CardsResponse {
  items: CardDto[];
  nextCursor?: string;
}
