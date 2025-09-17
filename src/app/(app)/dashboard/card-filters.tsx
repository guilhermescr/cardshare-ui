import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, Filter, Heart } from 'lucide-react';

type CardFiltersProps = {
  value: 'recent' | 'most-liked';
  onChange: (value: 'recent' | 'most-liked') => void;
};

export default function CardFilters({ value, onChange }: CardFiltersProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white border py-4" variant="ghost" size="sm">
          <Filter className="mr-1" /> Filter
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-52">
        <DropdownMenuItem
          variant={value === 'recent' ? 'gradient' : 'default'}
          onClick={() => onChange('recent')}
        >
          <Clock
            className={`mr-2 ${value === 'recent' ? 'text-white' : 'text-black'}`}
          />{' '}
          Recent
        </DropdownMenuItem>

        <DropdownMenuItem
          variant={value === 'most-liked' ? 'gradient' : 'default'}
          onClick={() => onChange('most-liked')}
        >
          <Heart
            className={`mr-2 ${value === 'most-liked' ? 'text-white' : 'text-black'}`}
          />{' '}
          Most Liked
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
