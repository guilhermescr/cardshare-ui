export interface CommentDto {
  id: string;
  cardId: string;
  authorId: string;
  author: string;
  content: string;
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}
