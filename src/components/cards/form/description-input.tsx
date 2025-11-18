import { Control, Controller } from 'react-hook-form';
import ErrorMessage from '@/components/error-message';
import { CardFormType } from '@/components/cards/form/card-form.schema';

interface DescriptionInputProps {
  control: Control<CardFormType>;
}

export default function DescriptionInput({ control }: DescriptionInputProps) {
  return (
    <section className="flex flex-col">
      <h3 className="text-sm font-medium mb-1">Description *</h3>
      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <textarea
              {...field}
              className={`bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black ${
                fieldState.error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your card in detail..."
              rows={3}
            ></textarea>
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </section>
  );
}
