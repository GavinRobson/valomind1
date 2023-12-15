'use client';

import { BarChartHorizontal, Map } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const ReplayHeader = () => {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get('mode');
  const pathname = usePathname();

  const onClick = () => {
    router.push(`${pathname.replace('/replay', '')}?mode=${query}`);
  };

  return (
    <div className="w-full h-full items-center flex flex-row px-4">
      <div className="w-full h-full space-x-2 flex flex-row items-center">
        <div className="flex flex-row w-[83rem] space-x-5 justify-end absolute">
          <button
            onClick={onClick}
            className="flex flex-row space-x-5 hover:text-[#FB5454] transition-all z-50"
          >
            <div>Stats View</div>
            <BarChartHorizontal />
          </button>
        </div>
      </div>
    </div>
  );
};
