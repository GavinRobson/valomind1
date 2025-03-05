'use client';

import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { ReplayHeader } from './replay-header';
import { ReplayMatch } from './replay-match';

interface ValorantReplayAreaProps {
  matchId?: string;
  puuid?: string;
}

export const ValorantReplayArea = ({
  matchId,
  puuid,
}: ValorantReplayAreaProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [replayData, setReplayData] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.henrikdev.xyz/valorant/v2/match/${matchId}?api_key=HDEV-162bdfe4-d0a6-48c4-8ea6-f0cf5b907473`
    )
      .then((res) => res.json())
      .then((data) => {
        setReplayData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [matchId]);

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
          <div className="pl-[300px] w-full h-[40px] z-30 md:flex flex-row fixed inset-x-0">
            <ReplayHeader />
          </div>
          <div className="h-full fixed pt-[40px]">
            <ReplayMatch replayData={replayData} puuid={puuid} />
          </div>
        </div>
      )}
    </div>
  );
};
