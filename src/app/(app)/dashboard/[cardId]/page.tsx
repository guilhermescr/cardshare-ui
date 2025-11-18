'use client';

import { lazy, Suspense } from 'react';
import GradientCardImage from '@/components/cards/gradient-card-image';
import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { Calendar, MoveLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import LikeButton from './like-button';
import { useCardDetails } from '@/hooks/use-card-details';
import FavoriteButton from './favorite-button';
import ProfilePicture from '@/components/ui/profile-picture';
import { formatDateToLongString } from '@/utils/date-handlers.utils';
import { shareCard } from '@/utils/share.utils';
import { capitalizeFirstLetter } from '@/utils/string.utils';
import { RelatedCardsSkeleton } from '@/components/cards/related-cards';
import { CommentSectionSkeleton } from './comments-section';

const CommentSection = lazy(() => import('./comments-section'));
const RelatedCards = lazy(() => import('@/components/cards/related-cards'));
const Carousel = lazy(() => import('@/components/ui/carousel'));

export default function CardDetailsPage() {
  const router = useRouter();
  const { cardId } = useParams();
  const { token } = useAuthStore();

  const { cardDetails, setCardDetails, loading, error } = useCardDetails(
    cardId as string,
    token
  );

  const cardDate = formatDateToLongString(cardDetails?.createdAt ?? '');

  if (loading) {
    return (
      <section className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-3 space-y-6">
          <div className="p-6 bg-white shadow-md rounded-lg animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          </div>

          <CommentSectionSkeleton />
        </section>

        <aside className="flex-1 space-y-6">
          <div className="bg-white p-5 shadow-md rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          </div>

          <RelatedCardsSkeleton />
        </aside>
      </section>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cardDetails && !loading) {
    return <p>No card details found.</p>;
  }

  return (
    <>
      <Button variant="ghost" className="mb-6" asChild>
        <Link href="/dashboard">
          <MoveLeft className="mr-2" /> Back to Dashboard
        </Link>
      </Button>

      <section className="flex flex-col gap-6 lg:flex-row">
        <section className="flex-3 space-y-6">
          <section className="p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-bold mb-4">
              <GradientText>{cardDetails?.title}</GradientText>
            </h1>

            <div className="flex items-center gap-2 mb-10">
              <ProfilePicture
                url={cardDetails?.author?.profilePicture ?? ''}
                size="small"
              />

              <p className="text-gray-600 text-sm font-medium">
                {cardDetails?.author?.username}
              </p>

              <span className="inline-block mx-1 text-xs">•</span>

              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} /> {cardDate}
              </span>
            </div>

            {cardDetails?.mediaUrls?.length ? (
              <Suspense
                fallback={
                  <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                }
              >
                <Carousel
                  mediaFiles={cardDetails.mediaUrls.map((url) => ({
                    type: url.endsWith('.mp4') ? 'video' : 'image',
                    media: url,
                    file: null,
                  }))}
                />
              </Suspense>
            ) : (
              <GradientCardImage
                gradient={cardDetails?.gradient ?? 'aurora'}
                size="large"
              />
            )}

            <p className="text-gray-700 leading-relaxed my-6 whitespace-pre-wrap">
              {cardDetails?.description}
            </p>

            {cardDetails && cardDetails?.tags?.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {cardDetails.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all text-xs py-1 px-2 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-col gap-4 items-start md:flex-row md:items-center justify-between">
              {cardDetails?.category && (
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Category:</span>{' '}
                  {capitalizeFirstLetter(cardDetails.category)}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4">
                <LikeButton
                  token={token}
                  card={cardDetails}
                  setCard={setCardDetails}
                />

                <Button
                  variant="outline"
                  onClick={() => {
                    if (cardDetails) {
                      shareCard(
                        cardDetails.title,
                        cardDetails.description,
                        `${window.location.origin}/dashboard/${cardDetails.id}`
                      );
                    }
                  }}
                >
                  <Share2 className="mr-2" /> Share
                </Button>

                <FavoriteButton
                  token={token}
                  card={cardDetails}
                  setCard={setCardDetails}
                />
              </div>
            </div>
          </section>

          <Suspense fallback={<CommentSectionSkeleton />}>
            <CommentSection
              allowComments={cardDetails?.allowComments}
              comments={cardDetails?.comments ?? []}
              cardId={cardDetails?.id}
              updateComments={(updateComments) =>
                setCardDetails((prevCard) => {
                  if (!prevCard) return prevCard;
                  return {
                    ...prevCard,
                    comments: updateComments,
                  };
                })
              }
            />
          </Suspense>
        </section>

        <aside className="flex-1 space-y-6">
          <div className="bg-white p-5 shadow-md rounded-lg">
            <h2 className="font-medium text-lg mb-7">About the Author</h2>

            <div className="flex gap-3 items-center mb-4">
              <ProfilePicture
                url={cardDetails?.author?.profilePicture ?? ''}
                size="small"
              />

              <div>
                <h3 className="font-medium">{cardDetails?.author?.username}</h3>
                <p className="text-sm text-gray-600">Bio here.</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/${cardDetails?.author?.username}`)}
            >
              View Profile
            </Button>
          </div>

          <Suspense fallback={<RelatedCardsSkeleton />}>
            <RelatedCards cardId={cardDetails?.id ?? ''} token={token} />
          </Suspense>
        </aside>
      </section>
    </>
  );
}
