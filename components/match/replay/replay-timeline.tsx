'use client';

import { Bomb, Crosshair, Scissors, Timer } from 'lucide-react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback } from 'react';

interface ReplayTimelineProps {
  data: any;
  team: string;
}

export const ReplayTimeline = ({ data, team }: ReplayTimelineProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const mode = params.get('mode');

  const roundQuery = params.get('round');
  const r = roundQuery !== null ? parseInt(roundQuery) : 0;

  const onClick = useCallback(
    (round: number) => (e: React.MouseEvent<HTMLElement>) => {
      router.push(`${pathname}?mode=${mode}&round=${round}`);
    },
    []
  );
  const rounds = data.data.rounds;
  return (
    <div className="h-full w-full flex flex-row justify-between">
      {rounds.map((round: any, i: number) => {
        const background =
          r === i ? '#aaaaaa' : i % 2 === 0 ? '#0C1C24' : '#11232e';
        const won = round.winning_team === team ? true : false;
        const gradient = won
          ? `linear-gradient(to bottom, #7AE582, transparent 45px)`
          : `linear-gradient(to bottom, #FB5454, transparent 45px)`;

        const endIcon =
          round.end_type == 'Eliminated' ? (
            <Crosshair />
          ) : round.end_type == 'Bomb defused' ? (
            <Scissors />
          ) : round.end_type == 'Bomb detonated' ? (
            <Bomb />
          ) : (
            <Timer />
          );

        return (
          <button
            className="flex flex-col items-center w-full justify-center transition-all hover:opacity-75"
            style={{ background: gradient, backgroundColor: background }}
            onClick={onClick(i)}
          >
            {endIcon}
          </button>
        );
      })}
    </div>
  );
};
