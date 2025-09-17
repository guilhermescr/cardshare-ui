import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, Filter, Heart } from 'lucide-react';

type CardFiltersProps = {
  value: 'latest' | 'most-liked';
  onChange: (value: 'latest' | 'most-liked') => void;
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
          variant={value === 'latest' ? 'gradient' : 'default'}
          onClick={() => onChange('latest')}
        >
          <Clock
            className={`mr-2 ${value === 'latest' ? 'text-white' : 'text-black'}`}
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
