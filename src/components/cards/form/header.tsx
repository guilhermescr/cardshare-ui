'use client';

import { Button } from '@/components/ui/button';
import { MoveLeft, Eye, Loader2, Save } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

interface CardFormHeaderProps {
  title: string;
  backLink: string;
  onGenerate?: () => void;
  isGenerating?: boolean;
  onSubmit: () => void;
  isSaving: boolean;
  onPreviewToggle?: () => void;
  isPreviewing?: boolean;
  showGenerateButton?: boolean;
}

export default function CardFormHeader({
  title,
  backLink,
  onGenerate,
  isGenerating = false,
  onSubmit,
  isSaving,
  onPreviewToggle,
  isPreviewing,
  showGenerateButton = false,
}: CardFormHeaderProps) {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex flex-col items-start md:flex-row md:items-center gap-4">
        <Button variant="ghost" className="md:mb-2" asChild>
          <Link href={backLink}>
            <MoveLeft className="mr-2" /> Back
          </Link>
        </Button>

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-700">
            {title === 'Create New Card'
              ? 'Share your amazing content with the world'
              : 'Edit your card details and save changes'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <Button variant="outline" onClick={onPreviewToggle}>
          <Eye className="mr-2" /> {isPreviewing ? 'Close Preview' : 'Preview'}
        </Button>

        {showGenerateButton && (
          <Button
            variant="outline"
            onClick={onGenerate}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <Loader2 className="mr-2 animate-spin" />
            ) : (
              <svg
                fill="currentColor"
                fillRule="evenodd"
                height="1em"
                viewBox="0 0 24 24"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="blueGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="20%" stopColor="#4f46e5" />
                    <stop offset="80%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
                <title>Gemini</title>
                <path
                  d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"
                  fill="url(#blueGradient)"
                ></path>
              </svg>
            )}
            {isGenerating ? 'Generating...' : 'Generate Card'}
          </Button>
        )}

        <Button
          variant="gradient"
          gradientColor="blue"
          onClick={() => {
            if (isPreviewing) {
              toast.error('Please close the preview before saving.');
            } else {
              onSubmit();
            }
          }}
          disabled={isSaving || isGenerating}
        >
          {isSaving ? (
            <Loader2 className="mr-2 animate-spin" />
          ) : (
            <Save className="mr-2" />
          )}
          {title === 'Create New Card' ? 'Publish Card' : 'Save Changes'}
        </Button>
      </div>
    </section>
  );
}
