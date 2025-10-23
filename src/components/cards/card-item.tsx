import {
  Ellipsis,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  User,
} from 'lucide-react';
import { Button } from '../ui/button';
import { CardDto } from '@/types/card.dto';
import { capitalizeFirstLetter } from '@/utils/string.utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import GradientCardImage from './gradient-card-image';

function CardMoreOptionsButton() {
  return (
    <div className="invisible group-hover:visible">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="w-40">
          <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => {}}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface CardItemProps {
  card: CardDto;
  gradientIndex?: number;
}

const gradients = [
  'from-orange-500 to-pink-500',
  'from-green-400 to-teal-500',
  'from-blue-500 to-purple-400',
  'from-purple-500 to-pink-400',
];

export default function CardItem({ card, gradientIndex = 0 }: CardItemProps) {
  const router = useRouter();
  const gradient = gradients[gradientIndex % gradients.length];

  const handleCardClick = () => {
    router.push(`/dashboard/${card.id}`);
  };

  return (
    <section
      className="bg-white shadow rounded-md p-6 cursor-pointer transition-transform ease-out duration-300 hover:scale-102 hover:shadow-lg group"
      onClick={handleCardClick}
    >
      <GradientCardImage gradient={gradient} />

      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg mt-5 mb-4 group-hover:text-blue-600">
          {card.title}
        </h3>

        <CardMoreOptionsButton />
      </div>
      <p className="text-gray-600 text-sm line-clamp-2 pr-6 mb-8">
        {card.description}
      </p>

      <div className="flex items-center gap-3 text-sm">
        <User size={16} />{' '}
        <span className="text-gray-700">{card.ownerUsername}</span>{' '}
        <span className="text-gray-400">•</span>{' '}
        <span className="text-gray-400">2 hours ago</span>
      </div>

      <div className="text-xs flex items-center gap-2 my-4">
        <span className="bg-gray-100 rounded-lg py-1 px-2">#nature</span>
        <span className="bg-gray-100 rounded-lg py-1 px-2">#sunset</span>
        <span className="bg-gray-100 rounded-lg py-1 px-2">#photography</span>
      </div>

      <div className="flex gap-4 items-center justify-between text-xs">
        <div className="flex items-center gap-4 text-gray-600">
          <span className="flex items-center gap-1">
            <Eye size={16} /> 156
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle size={16} /> 8
          </span>
        </div>

        <span
          className={`${card.visibility === 'public' ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' : 'bg-gray-100 text-black'} py-1 px-3 rounded-xl font-medium`}
        >
          {capitalizeFirstLetter(card.visibility)}
        </span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          className="hover:bg-red-100 hover:text-red-600 duration-300"
        >
          <Heart /> {card.likes.length}
        </Button>

        <Button
          variant="ghost"
          className="hover:bg-blue-100 hover:text-blue-600 duration-300"
        >
          <Share2 /> Share
        </Button>
      </div>
    </section>
  );
}
