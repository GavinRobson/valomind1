import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

import { Separator } from '@/components/ui/separator';
import { currentProfile } from '@/lib/current-profile';
import { currentValorant } from '@/lib/current-valorant';
import { NavigationAction } from './navigation-action';
import { NavigationHome } from './navigation-home';
import { ValorantSignInButton } from './valorant-sign-in-button';
import { LoadStatsButton } from './load-stats-button';
import { GameSwapHeaderItem } from './game-swap-header-item';
import { SearchBar } from './search-bar';

export const NavigationHeader = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const valorant = await currentValorant(profile.id);

  return (
    <div className="space-x-4 flex flex-row items-center w-full text-primary h-full bg-[#1E1F22] px-4">
      <NavigationHome />
      <Separator
        orientation="vertical"
        className="w-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md h-10 my-auto"
      />
      <NavigationAction id="/valorant/home" label="Home" />
      <NavigationAction
        id="/valorant/matches"
        label="Matches"
        accountId={profile.id}
        queryName="mode"
        queryValue="competitive"
      />
      <NavigationAction
        id="/valorant/stats/account/"
        label="Stats"
        accountId={profile.id}
      />
      <SearchBar />
      <div className="flex flex-row"></div>
      <div className="space-x-5 w-full pr-3 justify-end flex flex-row">
        <div>
          <GameSwapHeaderItem />
        </div>
        {valorant ? (
          <LoadStatsButton
            profileId={profile.id}
            puuid={valorant.puuid}
            region={valorant.region}
          />
        ) : (
          <ValorantSignInButton />
        )}
        <div>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-[30px] w-[30px]',
              },
              variables: {
                borderRadius: '0.5',
                spacingUnit: '0.5rem',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
