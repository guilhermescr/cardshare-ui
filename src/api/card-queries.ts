import { CardsResponse } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';

export type CardQueryParams = {
  pageParam?: string;
  token: string | null;
  sortBy?: 'latest' | 'most-liked';
};

export function fetchAllCards({
  pageParam,
  token,
  sortBy = 'latest',
}: CardQueryParams) {
  return httpRequest<CardsResponse>('/cards', {
    token,
    params: {
      ...(pageParam ? { cursor: pageParam } : {}),
      sortBy,
    },
  });
}

export function fetchMyCards({
  pageParam,
  token,
  sortBy = 'latest',
}: CardQueryParams) {
  return httpRequest<CardsResponse>('/users/me/cards', {
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
  return httpRequest<CardsResponse>('/users/me/liked', {
    token,
    params: {
      ...(pageParam ? { cursor: pageParam } : {}),
      sortBy,
    },
  });
}
