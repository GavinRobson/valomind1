import Image from 'next/image';
import { redirectToSignIn } from '@clerk/nextjs';

import { borders } from '@/borders.json';
import { db } from '@/lib/db';
import { currentProfile } from '@/lib/current-profile';

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
    <div className="h-full w-full">
      <div className="h-full w-full p-6">
        <div className="absolute h-1/2 w-1/4 rounded-md bg-[#1E1F22] p-6 flex flex-row justify-center">
          <div className="w-full h-[100px] flex flex-row items-center space-x-3 px-2">
            <div className="flex flex-row items-center justify-center w-[100px] h-[100px]">
              <Image
                src={card}
                alt="card"
                height={90}
                width={90}
                className="absolute rounded-lg hidden md:flex"
              />
              <Image
                src={borderImg}
                alt="border"
                height={103}
                width={103}
                className="absolute rounded-lg hidden md:flex"
              />
              <Image
                src={levelImg}
                alt="level"
                height={70}
                width={70}
                className="absolute pt-20 hidden md:flex"
              />
              <div
                style={{ fontFamily: 'beaufortforLOL' }}
                className="absolute text-sm text-white pt-[5.1rem]"
              >
                {level}
              </div>
            </div>
            <span
              style={{ fontFamily: 'beaufortforLOL' }}
              className="text-lg underline"
            >{`${valorantProfile.username} #${valorantProfile.tag}`}</span>
            <span style={{ fontFamily: 'beaufortforLOL' }} className="text-lg">
              {rank}
            </span>
          </div>
        </div>
        <div className="flex flex-row h-[100px] items-center space-x-3 px-2"></div>
      </div>
    </div>
  );
};
