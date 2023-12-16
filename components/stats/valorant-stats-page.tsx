import Image from 'next/image';
import { redirectToSignIn } from '@clerk/nextjs';

import { borders } from '@/borders.json';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';
import { StatsPlaylists } from './stats-playlists';

export const ValorantStatsPage = async ({
  data,
  userData,
  params,
}: {
  data: any;
  userData: any;
  params: { accountId: string };
}) => {
  console.log(data);
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

  const card = userData.data.card.small;
  const rank = data[data.length - 1].rank;
  const level = userData.data.account_level;
  const border: any = borders.find((border) => border.startingLevel >= level);
  const borderImg = border.smallPlayerCardAppearance;
  const levelImg = border.levelNumberAppearance;

  return (
    <div style={{ width: "calc(100% - 2rem)" }} className="flex flex-col space-y-4 w-screen-[2rem] px-[15%] h-full w-full py-6">
      <div style={{ width: "calc(100% - 2rem)" }} className="h-full grid grid-cols-3 gap-6">
        <StatsPlaylists />
        <div className='bg-white text-black flex items-center p-4 rounded-md'>
          Acts
        </div>
        <div className='bg-white text-black flex flex-row p-4 rounded-md'>
          Rank: Diamond 1
        </div>
        <div className='bg-white text-black flex flex-col p-4 items-center rounded-md'>
          <h1>Recent Matches</h1>
        </div>
      </div>
    </div>
  );
};
