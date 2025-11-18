import { Globe, Link, Lock, LucideIcon } from 'lucide-react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CardFormType } from '../../../components/cards/form/card-form.schema';

function RadioInput({
  id,
  name,
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  icon: LucideIcon;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <li className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <input
          className="appearance-none shrink-0 w-4 h-4 border border-gray-300 rounded-full peer cursor-pointer"
          type="radio"
          name={name}
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <div
          className="cursor-pointer absolute w-2 h-2 rounded-full bg-black opacity-0 transition-opacity peer-checked:opacity-100"
          onClick={onChange}
        />
      </div>

      <div>
        <label className="flex items-center gap-2 font-medium" htmlFor={id}>
          <Icon size={17} /> {label}
        </label>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
      </div>
    </li>
  );
}

interface VisibilitySettingsProps {
  watch: UseFormWatch<CardFormType>;
  setValue: UseFormSetValue<CardFormType>;
}

export default function VisibilitySettings({
  watch,
  setValue,
}: VisibilitySettingsProps) {
  const selectedVisibility = watch('selectedVisibility');

  return (
    <section className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="flex items-center gap-2 font-semibold text-lg mb-7">
        <Globe size={22} /> Visibility Settings
      </h2>

      <ul className="space-y-6">
        <RadioInput
          id="public"
          name="visibility"
          icon={Globe}
          label="Public"
          description="Anyone can discover this card"
          checked={selectedVisibility === 'public'}
          onChange={() => setValue('selectedVisibility', 'public')}
        />

        <RadioInput
          id="unlisted"
          name="visibility"
          icon={Link}
          label="Unlisted"
          description="Only people with the link can access"
          checked={selectedVisibility === 'unlisted'}
          onChange={() => setValue('selectedVisibility', 'unlisted')}
        />

        <RadioInput
          id="private"
          name="visibility"
          icon={Lock}
          label="Private"
          description="Only you can see this card"
          checked={selectedVisibility === 'private'}
          onChange={() => setValue('selectedVisibility', 'private')}
        />
      </ul>
    </section>
  );
}
