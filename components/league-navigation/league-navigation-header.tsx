import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { NavigationHome } from "../navigation/navigation-home";
import { NavigationAction } from "../navigation/navigation-action";
import { GameSwapHeaderItem } from "../navigation/game-swap-header-item";

export const LeagueNavigationHeader = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  return (
    <div className="space-x-4 flex flex-row items-center w-full text-primary h-full bg-[#1E1F22] px-4">
      <NavigationHome />
      <Separator 
        orientation="vertical"
        className="w-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md h-10 my-auto"
      />
      <NavigationAction 
        id="/lol/home"
        label="Home"
      />
      <NavigationAction 
        id="/lol/matches"
        label="Matches"
        accountId={profile.id}
        queryName="mode"
        queryValue="competitive"
      />
      <NavigationAction 
        id="/lol/stats/account/"
        label="Stats"
        accountId={profile.id}
      />
      <NavigationAction 
        id="/lol/search"
        label="Search"
      />
      <div className="space-x-5 w-full pr-3 justify-end flex flex-row items-center">
        <div>
          <GameSwapHeaderItem />
        </div> 
        <div>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-[30px] w-[30px]",
              },
              variables: {
                borderRadius: "0.5",
                spacingUnit: "0.5rem"
              }
            }}
            />
        </div>
      </div>
    </div>
  )
}