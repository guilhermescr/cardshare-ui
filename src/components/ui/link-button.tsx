'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LinkButton({
  href,
  ...props
}: { href: string } & React.ComponentProps<typeof Button>) {
  return (
    <Link href={href}>
      <Button {...props} />
    </Link>
  );
}
