'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Trash, Trash2, Loader2 } from 'lucide-react';

interface DeleteDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDelete: () => Promise<void>;
  isDeleting: boolean;
  title?: string;
  description?: string;
}

export default function DeleteDialog({
  isOpen,
  onOpenChange,
  onDelete,
  isDeleting,
  title = 'Delete Item?',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
}: DeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2 mb-2">
            <Trash2 size={22} /> {title}
          </DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            type="button"
            className="cursor-pointer border rounded-md h-full px-4 py-2 transition-all duration-300 font-medium text-sm hover:bg-gray-50"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="cursor-pointer bg-destructive flex items-center justify-center gap-3.5 text-sm font-medium text-white rounded-md px-4 py-2 h-full hover:bg-red-800 transition active:scale-95 disabled:opacity-90 disabled:cursor-not-allowed"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 size={20} className="h-4 w-4 animate-spin" />
            ) : (
              <Trash size={20} />
            )}{' '}
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
