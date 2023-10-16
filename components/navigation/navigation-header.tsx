import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { NavigationHome } from "./navigation-home";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";

export const NavigationHeader = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  return (
    <div className="space-x-4 flex flex-row items-center w-full text-primary h-full bg-[#1E1F22] px-4">
      <NavigationHome />
      <Separator 
        orientation="vertical"
        className="w-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md h-10 mx-auto"
      />
      <NavigationAction 
        id="/valorant/home"
        label="Home"
      />
      <NavigationAction 
        id="/valorant/matches"
        label="Matches"
        accountId={profile.id}
      />
      <NavigationAction 
        id="/valorant/stats/account/"
        label="Stats"
        accountId={profile.id}
      />
      <NavigationAction 
        id="/valorant/search"
        label="Search"
      />
    </div>
  )
}