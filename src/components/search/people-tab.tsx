import Link from 'next/link';
import { SummarizedUserDto } from '@/types/user.dto';
import ProfilePicture from '../ui/profile-picture';
import { Loader2 } from 'lucide-react';

interface PeopleTabProps {
  peopleResults: SummarizedUserDto[] | null;
  isSearching: boolean;
  onClose: () => void;
}

export default function PeopleTab({
  peopleResults,
  isSearching,
  onClose,
}: PeopleTabProps) {
  if (isSearching) {
    return (
      <div className="flex justify-center items-center h-28">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      {peopleResults === null ? (
        <p className="text-gray-500 text-sm">Start typing to search...</p>
      ) : peopleResults.length === 0 ? (
        <p className="text-gray-500 text-sm">No users found.</p>
      ) : (
        <ul className="space-y-4">
          {peopleResults.map((person) => (
            <li key={person.id}>
              <Link
                href={`/${person.username}`}
                className="cursor-pointer p-4 border rounded-lg shadow-sm bg-white flex items-center gap-3 w-full hover:brightness-98 hover:border-blue-400 transition"
                onClick={onClose}
              >
                <ProfilePicture url={person.profilePicture} size="small" />

                <div>
                  <h3 className="font-medium text-left">{person.fullName}</h3>
                  <p className="text-sm text-gray-600">@{person.username}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
