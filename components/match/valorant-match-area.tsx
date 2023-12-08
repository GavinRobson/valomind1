'use client';

import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { ValorantMatch } from '@/components/match/valorant-match-display';
import { MatchStatsHeader } from './match-stats-header';

interface ValorantMatchAreaProps {
  matchId?: string;
  puuid?: string;
}

export const ValorantMatchArea = ({
  matchId,
  puuid,
}: ValorantMatchAreaProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://api.henrikdev.xyz/valorant/v2/match/${matchId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMatchData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [matchId]);

  if (matchId === undefined || matchId === null) {
    return <div>Select a Match</div>;
  }

  return (
    <div className="h-full">
      {isLoading ? (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <div className="mt-[120px] ml-[300px]">
            <PuffLoader size={50} color="#FB5454" />
          </div>
        </div>
      ) : (
        <div>
          <div className="pl-[300px] w-full h-[40px] z-0 md:flex flex-row fixed inset-x-0">
            <MatchStatsHeader />
          </div>
          <div className="h-full fixed pt-[40px]">
            <ValorantMatch matchData={matchData} puuid={puuid} />
          </div>
        </div>
      )}
    </div>
  );
};
