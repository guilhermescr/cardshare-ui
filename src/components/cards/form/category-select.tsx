import { Control, Controller } from 'react-hook-form';
import { ChevronDown } from 'lucide-react';
import ErrorMessage from '@/components/error-message';
import { CreateCardFormType } from '@/app/(app)/new/create-card.schema';

interface CategorySelectProps {
  control: Control<CreateCardFormType>;
}

export default function CategorySelect({ control }: CategorySelectProps) {
  return (
    <section>
      <h3 className="text-sm font-medium mb-1">Category *</h3>
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div className="relative">
              <select
                {...field}
                className={`cursor-pointer bg-gray-50 border rounded-md w-full py-2 px-2.5 text-gray-600 text-sm focus:outline-none focus:border-black appearance-none ${
                  fieldState.error ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="" disabled>
                  Select a category...
                </option>
                <option value="photography">📸 Photography</option>
                <option value="art-design">🎨 Art & Design</option>
                <option value="technology">💻 Technology</option>
                <option value="travel">✈️ Travel</option>
                <option value="music">🎵 Music</option>
                <option value="education">📚 Education</option>
                <option value="food-recipes">🍔 Food & Recipes</option>
                <option value="other">✨ Other</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                size={18}
              />
            </div>
            <ErrorMessage error={fieldState.error} />
          </>
        )}
      />
    </section>
  );
}
