import { Control, Controller } from 'react-hook-form';
import ErrorMessage from '@/components/error-message';
import { CardFormType } from '@/components/cards/form/card-form.schema';

interface TitleInputProps {
  control: Control<CardFormType>;
}

export default function TitleInput({ control }: TitleInputProps) {
  return (
    <section>
      <h3 className="text-sm font-medium mb-1">Title *</h3>
      <Controller
        name="title"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              className={`bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black ${
                fieldState.error ? 'border-red-500' : 'border-gray-300'
              }`}
              type="text"
              placeholder="Enter a title..."
            />
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </section>
  );
}
