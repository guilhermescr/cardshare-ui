import { CardDto } from '@/types/card.dto';
import { PaginatedResponseDto } from '@/types/paginated-response.dto';
import { httpRequest } from '@/utils/http.utils';

export type CardQueryParams = {
  pageParam?: string;
  token: string | null;
  sortBy?: 'latest' | 'most-liked';
  searchText?: string;
};

export function fetchAllCards({
  pageParam,
  token,
  sortBy = 'latest',
  searchText,
}: CardQueryParams) {
  const params: Record<string, string> = {
    ...(pageParam ? { cursor: pageParam } : {}),
    sortBy,
    ...(searchText ? { search: searchText } : {}),
  };

  return httpRequest<PaginatedResponseDto<CardDto>>('/cards', {
    token,
    params,
  });
}

export function fetchMyCards({
  pageParam,
  token,
  sortBy = 'latest',
}: CardQueryParams) {
  return httpRequest<PaginatedResponseDto<CardDto>>('/users/me/cards', {
    token,
    params: {
      ...(pageParam ? { cursor: pageParam } : {}),
      sortBy,
    },
  });
}

export function fetchLikedCards({
  pageParam,
  token,
  sortBy = 'latest',
}: CardQueryParams) {
  return httpRequest<PaginatedResponseDto<CardDto>>('/users/me/liked', {
    token,
    params: {
      ...(pageParam ? { cursor: pageParam } : {}),
      sortBy,
    },
  });
}
