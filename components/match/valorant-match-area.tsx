'use client';

import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { ValorantMatch } from '@/components/match/valorant-match-display';
import { MatchStatsHeader } from './match-stats-header';
import fetch from 'node-fetch';

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
  console.log(matchData);
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.henrikdev.xyz/valorant/v2/match/${matchId}?api_key=HDEV-162bdfe4-d0a6-48c4-8ea6-f0cf5b907473`
    )
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
    <div className="h-screen">
      {isLoading ? (
        <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <div className="mt-[120px] ml-[300px]">
            <PuffLoader size={50} color="#FB5454" />
          </div>
        </div>
      ) : (
        <div>
          <div className="pl-[300px] w-full h-[40px] z-30 md:flex flex-row fixed inset-x-0">
            <MatchStatsHeader />
          </div>
          <div className="h-screen fixed pt-[40px]">
            <ValorantMatch matchData={matchData} puuid={puuid} />
          </div>
        </div>
      )}
    </div>
  );
};
