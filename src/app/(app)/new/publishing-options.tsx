import { Switch } from '@/components/ui/switch';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateCardFormType } from './create-card.schema';

interface PublishingOptionsProps {
  watch: UseFormWatch<CreateCardFormType>;
  setValue: UseFormSetValue<CreateCardFormType>;
}

interface PublishingOptionProps extends PublishingOptionsProps {
  label: string;
  description: string;
  fieldName: keyof CreateCardFormType;
}

function PublishingOption({
  watch,
  setValue,
  label,
  description,
  fieldName,
}: PublishingOptionProps) {
  return (
    <li className="text-sm flex items-center justify-between">
      <div>
        <label htmlFor={fieldName} className="font-medium">
          {label}
        </label>
        <p className="text-gray-600">{description}</p>
      </div>

      <Switch
        id={fieldName}
        name={fieldName}
        checked={watch(fieldName) as boolean}
        onCheckedChange={(checked) => setValue(fieldName, checked)}
      />
    </li>
  );
}

export default function PublishingOptions({
  watch,
  setValue,
}: PublishingOptionsProps) {
  const publishingOptions = [
    {
      label: 'Allow Comments',
      description: 'Let users comment on your card',
      fieldName: 'allowComments',
    },
    {
      label: 'Allow Downloads',
      description: 'Let users download your content',
      fieldName: 'allowDownloads',
    },
  ] as const;

  return (
    <section className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="flex items-center gap-2 font-semibold text-lg mb-7">
        Publishing Options
      </h2>

      <ul className="space-y-6">
        {publishingOptions.map((option) => (
          <PublishingOption
            key={option.fieldName}
            watch={watch}
            setValue={setValue}
            label={option.label}
            description={option.description}
            fieldName={option.fieldName}
          />
        ))}
      </ul>
    </section>
  );
}
