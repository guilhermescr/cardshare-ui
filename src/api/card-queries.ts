import { CardsResponse } from '@/types/card.dto';
import { httpRequest } from '@/utils/http.utils';

export type CardQueryParams = {
  pageParam?: string;
  token: string | null;
};

export function fetchAllCards({ pageParam, token }: CardQueryParams) {
  return httpRequest<CardsResponse>('/cards', {
    token,
    params: pageParam ? { cursor: pageParam } : undefined,
  });
}

export function fetchMyCards({ pageParam, token }: CardQueryParams) {
  return httpRequest<CardsResponse>('/users/me/cards', {
    token,
    params: pageParam ? { cursor: pageParam } : undefined,
  });
}

export function fetchLikedCards({ pageParam, token }: CardQueryParams) {
  return httpRequest<CardsResponse>('/users/me/liked', {
    token,
    params: pageParam ? { cursor: pageParam } : undefined,
  });
}
