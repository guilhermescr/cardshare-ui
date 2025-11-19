import { CardDto } from './card.dto';

export interface UserDto {
  id: string;
  fullName: string;
  username: string;
  email: string;
  profilePicture: string;
  bio: string;
  isFollowing: boolean;
  following: string[];
  followers: string[];
  cards: CardDto[];
}

export interface SummarizedUserDto {
  id: string;
  fullName: string;
  username: string;
  profilePicture: string;
}

export interface UserResponseDto {
  user: UserDto;
}

export interface FollowUserResponseDto {
  following: boolean;
}
