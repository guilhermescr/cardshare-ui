import { ImageIcon, Upload, X } from 'lucide-react';
import { useRef } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateCardFormType } from './create-card.schema';
import { toast } from 'sonner';

interface MediaSectionProps {
  watch: UseFormWatch<CreateCardFormType>;
  setValue: UseFormSetValue<CreateCardFormType>;
}

export default function MediaSection({ watch, setValue }: MediaSectionProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const mediaFiles = watch('mediaFiles') || [];
  const MAX_FILES_TO_UPLOAD = 10;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (mediaFiles.length + filesArray.length > 10) {
        toast.error('You can only upload up to 10 files.');
        return;
      }

      setValue('mediaFiles', [...mediaFiles, ...filesArray]);
      e.target.value = '';
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = mediaFiles.filter((_, i) => i !== index);
    setValue('mediaFiles', updatedFiles);
    toast.success('File removed successfully.');
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
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        className="cursor-pointer flex flex-col gap-2 items-center justify-center border-2 border-dashed rounded-md h-50 px-4 w-full transition-all hover:border-blue-400"
        type="button"
        onClick={() => fileUploadRef?.current?.click()}
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
            {mediaFiles.map((file, index) => (
              <div
                key={index}
                className="group relative flex flex-col gap-1.5 items-center justify-center border-2 border-gray-200 bg-gray-50 rounded-md p-4"
              >
                <ImageIcon className="text-gray-400" size={30} />
                <p className="text-sm text-gray-600 text-center">{file.name}</p>

                <button
                  type="button"
                  className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity absolute -top-2.5 -right-2.5 bg-destructive rounded-full p-1 text-white hover:brightness-90"
                  onClick={() => handleDeleteFile(index)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
