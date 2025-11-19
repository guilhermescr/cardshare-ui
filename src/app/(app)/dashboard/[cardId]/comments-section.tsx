'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Send } from 'lucide-react';
import { CommentDto } from '@/types/comment.dto';
import { formatDateTime } from '@/utils/date-handlers.utils';
import DeleteDialog from '@/components/delete-dialog';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth';
import { httpRequest } from '@/utils/http.utils';
import ProfilePicture from '@/components/ui/profile-picture';

export function CommentSectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
    </div>
  );
}

interface CommentSectionProps {
  allowComments?: boolean;
  comments: CommentDto[];
  cardId?: string;
  updateComments: (updatedComments: CommentDto[]) => void;
}

export default function CommentSection({
  allowComments = true,
  comments,
  cardId,
  updateComments,
}: CommentSectionProps) {
  const { user, token } = useAuthStore();
  const [newComment, setNewComment] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

  const renderCommentDateTime = (dateToFormat: Date) => {
    const { date, time } = formatDateTime(dateToFormat);
    return (
      <span className="text-gray-500 text-[13px]">
        {time && `${time} •`} {date}
      </span>
    );
  };

  const saveComment = async () => {
    if (!newComment.trim()) return;

    setIsSaving(true);
    try {
      const createdComment = await httpRequest<CommentDto>(`/comments`, {
        method: 'POST',
        body: {
          cardId,
          content: newComment,
        },
        token,
      });
      updateComments([createdComment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Failed to save comment:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleLikeComment = async (commentId: string, isLiked: boolean) => {
    setIsLiking(true);
    try {
      await httpRequest(`/comments/${commentId}/like`, {
        method: 'POST',
        token,
      });
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId && user) {
          const updatedLikes = isLiked
            ? [...comment.likes, user.id]
            : comment.likes.filter((like) => like !== user.id);
          return { ...comment, likes: updatedLikes };
        }
        return comment;
      });
      updateComments(updatedComments);
    } catch (error) {
      console.error('Failed to like comment:', error);
    } finally {
      setIsLiking(false);
    }
  };

  const deleteComment = async () => {
    if (!commentToDelete) return;

    setIsDeleting(true);
    try {
      await httpRequest(`/comments/${commentToDelete}`, {
        method: 'DELETE',
        token,
      });
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentToDelete
      );
      updateComments(updatedComments);
      toast.success('Comment deleted successfully');
    } catch (error) {
      console.error('Failed to delete comment:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
      setCommentToDelete(null);
    }
  };

  return (
    <section className="p-6 bg-white shadow-md rounded-lg">
      {!allowComments ? (
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Comments are disabled for this card.
          </p>
          <p className="text-sm text-gray-500">
            Enable comments to allow users to share their thoughts.
          </p>
        </div>
      ) : (
        <>
          <h2 className="flex items-center gap-2 font-medium">
            <MessageCircle size={18} /> Comments ({comments.length})
          </h2>

          <div className="flex items-start gap-3 my-6">
            <div className="rounded-full py-2.5 px-2 flex items-center justify-center text-sm bg-gradient-to-br from-blue-100 to-purple-100">
              You
            </div>

            <div className="flex flex-col gap-3 w-full">
              <textarea
                className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-gray-500"
                name="comment"
                id="comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSaving}
              ></textarea>

              <Button
                className="w-max"
                variant="gradient"
                gradientColor="blue"
                onClick={saveComment}
                disabled={isSaving || !newComment.trim()}
              >
                <Send className="mr-2" />
                {isSaving ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          </div>

          <hr />

          {comments.length === 0 ? (
            <div className="pt-5 text-center">
              <p className="text-lg font-medium text-gray-700">
                No comments yet
              </p>
              <p className="text-sm text-gray-500">
                Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <ul className="pt-5 pr-2.5 space-y-5 max-h-96 overflow-y-auto">
              {comments.map((comment) => {
                const isLiked = user && comment.likes.includes(user.id);

                return (
                  <li key={comment.id} className="flex items-start gap-3">
                    <ProfilePicture
                      url={comment.author.profilePicture}
                      size="small"
                    />

                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-md p-3.5 pt-2 w-full">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-medium text-gray-800">
                            {comment.author.username}
                          </h3>

                          {renderCommentDateTime(comment.createdAt)}
                        </div>

                        <p
                          className="text-gray-700 text-sm whitespace-pre-wrap break-all"
                          style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                        >
                          {comment.content}
                        </p>
                      </div>

                      <div className="ml-2 mt-1 flex items-center gap-3 text-sm text-gray-500">
                        <button
                          type="button"
                          className={`cursor-pointer transition-colors duration-200 ${
                            isLiked
                              ? 'text-blue-500 hover:text-blue-400'
                              : 'hover:text-blue-500'
                          }`}
                          onClick={() =>
                            toggleLikeComment(comment.id, !isLiked)
                          }
                          disabled={isLiking}
                        >
                          {isLiked ? 'Liked' : 'Like'}
                          {comment.likes.length > 0 && (
                            <> ({comment.likes.length})</>
                          )}
                        </button>

                        {comment.author.id === user?.id && (
                          <button
                            type="button"
                            className="cursor-pointer transition-colors duration-200 hover:text-red-500"
                            onClick={() => {
                              setCommentToDelete(comment.id);
                              setShowDeleteDialog(true);
                            }}
                            disabled={isDeleting}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}

              <DeleteDialog
                isOpen={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onDelete={deleteComment}
                isDeleting={isDeleting}
                title="Delete Comment?"
                description="Are you sure you want to delete this comment? This action cannot be undone."
              />
            </ul>
          )}
        </>
      )}
    </section>
  );
}
