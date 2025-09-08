import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Clock, Filter, Heart } from 'lucide-react';

export default function CardFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white border py-4" variant="ghost" size="sm">
          <Filter className="mr-1" /> Filter
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="w-52">
        <DropdownMenuItem onClick={() => {}}>
          <Heart className="mr-2" /> Most Liked
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <Clock className="mr-2" /> Recent
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
