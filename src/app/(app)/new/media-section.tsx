import { ImageIcon, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CardFormType } from '@/components/cards/form/card-form.schema';
import { toast } from 'sonner';
import DeleteDialog from '@/components/delete-dialog';
import { httpRequest } from '@/utils/http.utils';
import { useAuthStore } from '@/stores/auth';
import Carousel from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MediaSectionProps {
  watch: UseFormWatch<CardFormType>;
  setValue: UseFormSetValue<CardFormType>;
  cardId?: string;
}

export default function MediaSection({
  watch,
  setValue,
  cardId,
}: MediaSectionProps) {
  const { token } = useAuthStore();

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const mediaFiles = watch('mediaFiles') || [];
  const MAX_FILES_TO_UPLOAD = 10;

  const handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    addFiles(filesArray);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!e.dataTransfer?.files) return;
    const filesArray = Array.from(e.dataTransfer.files);
    addFiles(filesArray);
  };

  const addFiles = (filesArray: File[]) => {
    const newMediaFiles = filesArray.map((file) => ({
      type: file.type.startsWith('video') ? 'video' : 'image',
      media: URL.createObjectURL(file),
      file: file,
    }));

    if (mediaFiles.length + newMediaFiles.length > MAX_FILES_TO_UPLOAD) {
      toast.error(`You can only upload up to ${MAX_FILES_TO_UPLOAD} files.`);
      return;
    }

    setValue('mediaFiles', [...mediaFiles, ...newMediaFiles]);
  };

  const handleDeleteFile = (index: number) => {
    const file = mediaFiles[index];
    if (file.file === null) {
      setDeleteIndex(index);
    } else {
      const updatedFiles = mediaFiles.filter((_, i) => i !== index);
      setValue('mediaFiles', updatedFiles);
      toast.success('File removed successfully.');
    }
  };

  const confirmDeleteFile = async () => {
    if (deleteIndex === null) return;

    try {
      setIsDeleting(true);

      await httpRequest(`/cards/${cardId}/file`, {
        method: 'DELETE',
        token,
        body: { fileUrl: mediaFiles[deleteIndex].media },
      });

      const updatedFiles = mediaFiles.filter((_, i) => i !== deleteIndex);
      setValue('mediaFiles', updatedFiles);

      toast.success('File removed successfully.');
    } catch (error) {
      toast.error('Failed to delete the file. Please try again.');
    } finally {
      setDeleteIndex(null);
      setIsDeleting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const openPreview = (index: number) => {
    setCurrentMediaIndex(index);
    setIsPreviewOpen(true);
  };

  return (
    <section>
      <h3 className="text-sm font-medium">Media (Optional)</h3>
      <p className="text-gray-700 text-sm mb-4">
        Add photos or videos to make your card stand out
      </p>

      <input
        ref={fileUploadRef}
        type="file"
        id="file-upload"
        name="file-upload"
        accept=".jpg,.jpeg,.png,.webp,.avif,.gif,.mp4"
        multiple
        onChange={handleInputFileChange}
        className="hidden"
      />

      <button
        className={`cursor-pointer flex flex-col gap-2 items-center justify-center border-2 ${
          isDragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-dashed hover:border-blue-400'
        } rounded-md h-50 px-4 w-full transition-all`}
        type="button"
        onClick={() => fileUploadRef?.current?.click()}
        onDragOver={handleDragOver}
        onDragEnter={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="text-gray-400 mb-2" size={50} />

        <p className="text-gray-600">
          Drag and drop media files, or click to browse
        </p>
        <span className="text-gray-500 text-sm">
          Supports image and videos (max {MAX_FILES_TO_UPLOAD} files)
        </span>
      </button>

      {mediaFiles.length > 0 && (
        <>
          <h4 className="text-sm font-medium my-4">
            Uploaded Media ({mediaFiles.length})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {mediaFiles.map((file, index) => {
              const fileName = file.media.split('/').pop();

              return (
                <div
                  key={index}
                  className="group relative flex flex-col gap-1.5 items-center justify-center border-2 border-gray-200 bg-gray-50 rounded-md p-4 cursor-pointer"
                  onClick={() => openPreview(index)}
                >
                  <ImageIcon className="text-gray-400" size={30} />
                  <p className="text-sm text-gray-600 text-center break-all">
                    {fileName}
                  </p>

                  <button
                    type="button"
                    className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2.5 -right-2.5 bg-destructive rounded-full p-1 text-white hover:brightness-90"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(index);
                    }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}

      <DeleteDialog
        isOpen={deleteIndex !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDeleteIndex(null);
        }}
        onDelete={confirmDeleteFile}
        isDeleting={isDeleting}
        title="Delete Media?"
        description="Are you sure you want to delete this media? This action cannot be undone."
      />

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Media Preview</DialogTitle>
          </DialogHeader>
          <Carousel mediaFiles={mediaFiles} currentIndex={currentMediaIndex} />
        </DialogContent>
      </Dialog>
    </section>
  );
}
