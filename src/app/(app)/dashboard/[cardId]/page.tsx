'use client';

import GradientCardImage from '@/components/cards/gradient-card-image';
import GradientText from '@/components/gradient-text';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth';
import { Calendar, Eye, MoveLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import LikeButton from './like-button';
import { useCardDetails } from '@/hooks/use-card-details';
import FavoriteButton from './favorite-button';
import CommentSection from './comments-section';
import { httpRequest } from '@/utils/http.utils';
import { CommentDto } from '@/types/comment.dto';
import RelatedCards from '@/components/cards/related-cards';

export default function CardDetailsPage() {
  const router = useRouter();
  const { cardId } = useParams();
  const { token, user } = useAuthStore();

  const { cardDetails, setCardDetails, loading, error } = useCardDetails(
    cardId as string,
    token
  );

  const currentDate = cardDetails?.createdAt
    ? new Date(cardDetails.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : '';

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!cardDetails && !loading) {
    return <p>No card details found.</p>;
  }

  const saveComment = async (newComment: string) => {
    const createdComment = await httpRequest<CommentDto>(`/comments`, {
      method: 'POST',
      body: {
        cardId: cardDetails?.id,
        content: newComment,
      },
      token,
    });
    setCardDetails((prevCard) => {
      if (!prevCard) return prevCard;
      return {
        ...prevCard,
        comments: [createdComment, ...prevCard.comments],
      };
    });
  };

  const toggleLikeComment = async (commentId: string, isLiked: boolean) => {
    await httpRequest(`/comments/${commentId}/like`, {
      method: 'POST',
      token,
    });
    setCardDetails((prevCard) => {
      if (!prevCard) return prevCard;
      return {
        ...prevCard,
        comments: prevCard.comments.map((comment) => {
          if (comment.id === commentId && user) {
            const updatedLikes = isLiked
              ? [...comment.likes, user.id]
              : comment.likes.filter((like) => like !== user.id);
            return { ...comment, likes: updatedLikes };
          }
          return comment;
        }),
      };
    });
  };

  const deleteComment = async (commentId: string) => {
    await httpRequest(`/comments/${commentId}`, {
      method: 'DELETE',
      token,
    });
    setCardDetails((prevCard) => {
      if (!prevCard) return prevCard;
      return {
        ...prevCard,
        comments: prevCard.comments.filter(
          (comment) => comment.id !== commentId
        ),
      };
    });
  };

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
              <div className="bg-gray-200 rounded-full p-4">
                {/* Profile Picture */}
              </div>

              <p className="text-gray-600 text-sm font-medium">John Doe</p>

              <span className="inline-block mx-1 text-xs">•</span>

              <span className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} /> {currentDate}
              </span>
            </div>

            <GradientCardImage
              gradient="from-orange-500 to-pink-500"
              size="large"
            />

            <p className="text-gray-700 leading-relaxed my-6">
              A stunning sunset over the mountains captured during my recent
              hiking trip. The golden hour lighting created this magical
              atmosphere that I just had to share with everyone. This moment
              reminded me why I love photography and nature so much.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all text-xs py-1 px-2 rounded-md">
                #nature
              </span>
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all text-xs py-1 px-2 rounded-md">
                #sunset
              </span>
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all text-xs py-1 px-2 rounded-md">
                #photography
              </span>
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all text-xs py-1 px-2 rounded-md">
                #hiking
              </span>
              <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all text-xs py-1 px-2 rounded-md">
                #mountains
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-4 items-end md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5">
                  <Eye size={16} />
                  <span className="text-sm text-gray-700">156 Views</span>
                </span>
              </div>

              <div className="flex items-center gap-4">
                <LikeButton
                  token={token}
                  card={cardDetails}
                  setCard={setCardDetails}
                />

                <Button variant="outline">
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

          <CommentSection
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
        </section>

        <aside className="flex-1 space-y-6">
          <div className="bg-white p-5 shadow-md rounded-lg">
            <h2 className="font-medium text-lg mb-7">About the Author</h2>

            <div className="flex gap-3 items-center mb-4">
              <div className="bg-gray-200 rounded-full p-5">
                {/* Profile Picture */}
              </div>

              <div>
                <h3 className="font-medium">{cardDetails?.ownerUsername}</h3>
                <p className="text-sm text-gray-600">Bio here.</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push(`/${cardDetails?.ownerUsername}`)}
            >
              View Profile
            </Button>
          </div>

          <RelatedCards cardId={cardDetails?.id ?? ''} token={token} />
        </aside>
      </section>
    </>
  );
}
