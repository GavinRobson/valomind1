import Image from 'next/image';
import { redirectToSignIn } from '@clerk/nextjs';

import { borders } from '@/borders.json';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { StatsPlaylists } from './stats-playlists';
import { PlayerHeader } from './player-header';
import { ScrollArea } from '../ui/scroll-area';

export const ValorantStatsPage = async ({
  data,
  userData,
  params,
}: {
  data: any;
  userData: any;
  params: { accountId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const valorantProfile = await db.valorantProfile.findUnique({
    where: {
      profileId: params.accountId,
    },
  });

  if (!valorantProfile) {
    return (
      <div className="absolute h-full w-full flex justify-center">
        404 Error, user not found!
      </div>
    );
  }

  const headerData = await fetch(
    `https://valorant-api.com/v1/agents/${data[0].maps[0].character}`
  );

  const headerImg = await headerData.json();

  const card = userData.data.card.small;
  const rank = data[data.length - 1].rank;
  const level = userData.data.account_level;
  const border: any = borders.find((border) => border.startingLevel >= level);
  const borderImg: string = border.smallPlayerCardAppearance;
  const levelImg = border.levelNumberAppearance;

  return (
    <ScrollArea className="absolute h-screen w-full">
      <PlayerHeader
        headerImg={headerImg}
        data={{ card, rank, borderImg, levelImg }}
      />
      <div
        style={{ width: 'calc(100% - 2rem)' }}
        className="flex flex-col space-y-4 px-[15%] h-full w-full py-6"
      >
        <div
          style={{ width: 'calc(100% - 2rem)' }}
          className="h-full grid grid-cols-3 gap-6"
        >
          <div className="bg-white text-black flex justify-center p-4 rounded-md">
            Acts
          </div>
          <div className="bg-white text-black flex flex-row p-4 rounded-md">
            Rank: Diamond 1
          </div>
          <div className="bg-white text-black flex flex-col p-4 items-center rounded-md">
            <h1>Recent Matches</h1>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
