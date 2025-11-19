'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search } from 'lucide-react';
import { CardDto } from '@/types/card.dto';
import { SummarizedUserDto } from '@/types/user.dto';
import CardsTab from './cards-tab';
import PeopleTab from './people-tab';
import { fetchAllCards } from '@/api/card-queries';
import { useAuthStore } from '@/stores/auth';
import { toast } from 'sonner';
import { httpRequest } from '@/utils/http.utils';
import { PaginatedResponseDto } from '@/types/paginated-response.dto';

interface SearchDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function SearchDialog({
  isOpen,
  onOpenChange,
}: SearchDialogProps) {
  const { token } = useAuthStore();

  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState<'cards' | 'people'>('cards');
  const [cardResults, setCardResults] = useState<CardDto[] | null>(null);
  const [peopleResults, setPeopleResults] = useState<
    SummarizedUserDto[] | null
  >(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setCardResults(null);
      setPeopleResults(null);
    } else {
      try {
        setIsSearching(true);

        const cardsResponse = await fetchAllCards({ token, searchText });
        setCardResults(cardsResponse.items);

        const peopleResponse = await httpRequest<
          PaginatedResponseDto<SummarizedUserDto>
        >('/users', {
          token,
          params: { search: searchText },
        });
        setPeopleResults(peopleResponse.items);
      } catch (error) {
        console.error('Search error:', error);
        toast.error('An error occurred while searching. Please try again.');
        setCardResults([]);
        setPeopleResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };

  const handleClose = () => {
    setSearchText('');
    setCardResults(null);
    setPeopleResults(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Type to search for what you're looking for.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              onClick={handleSearch}
              disabled={!searchText.trim() || isSearching}
            >
              {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
            </Button>
          </div>

          <Tabs
            defaultValue="cards"
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'cards' | 'people')}
          >
            <TabsList>
              <TabsTrigger value="cards">Cards</TabsTrigger>
              <TabsTrigger value="people">People</TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="mt-4">
              <CardsTab
                cardResults={cardResults}
                isSearching={isSearching}
                onClose={handleClose}
              />
            </TabsContent>

            <TabsContent value="people" className="mt-4">
              <PeopleTab
                peopleResults={peopleResults}
                isSearching={isSearching}
                onClose={handleClose}
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
