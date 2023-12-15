'use client';

import { createQueryString } from '@/hooks/create-query-params';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface MatchModeNavigationProps {
  id: string;
  label: string;
}

export const MatchModeNavigation = ({
  id,
  label,
}: MatchModeNavigationProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('mode', id);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'text-primary transition-all hover:text-[#FB5454] hover:font-semibold',
        searchParams.get('mode') === id && 'text-[#FB5454]'
      )}
    >
      {label}
    </button>
  );
};
