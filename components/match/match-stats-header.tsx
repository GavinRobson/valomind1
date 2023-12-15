'use client';

import { Map } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const MatchStatsHeader = () => {
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get('mode');
  const pathname = usePathname();

  const onClick = () => {
    router.push(`${pathname}/replay?mode=${query}&round=0`);
  };

  return (
    <div className="w-full h-full items-center flex flex-row px-4">
      <div className="w-full h-full space-x-2 flex flex-row items-center">
        <div className="w-[258px] flex justify-center">Players</div>
        <div className="flex flex-row space-x-2 items-center">
          <div className="w-[6rem] flex justify-center">Rank</div>
          <div className="w-[6rem] flex justify-center">Score</div>
          <div className="w-[4rem] flex justify-center">K</div>
          <div className="w-[4rem] flex justify-center">D</div>
          <div className="w-[4rem] flex justify-center">A</div>
          <div className="w-[4rem] flex justify-center">+/-</div>
          <div className="w-[4rem] flex justify-center">K/D</div>
        </div>
        <div className="flex flex-row w-[83rem] space-x-5 justify-end absolute">
          <button
            onClick={onClick}
            className="flex flex-row space-x-5 hover:text-[#FB5454] transition-all"
          >
            <div>Map Overview</div>
            <Map />
          </button>
        </div>
      </div>
    </div>
  );
};
