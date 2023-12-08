import { currentProfile } from "@/lib/current-profile"
import { currentValorant } from "@/lib/current-valorant";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { MatchModeNavigation } from "./match-mode-navigation";

export const MatchOverviewHeader = async ({
  params,
}: { params: { accountId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const valorant = await currentValorant(profile.id);

  if (!valorant) {
    return redirect('/valorant-sign-in');
  }

  return (
    <div className="space-x-4 flex flex-row items-center justify-between w-full text-primary h-full bg-neutral-700 px-16">
      <MatchModeNavigation
        id="competitive"
        label="Competitive"
      />
      <MatchModeNavigation
        id="unrated"
        label="Unrated"
      />
      <MatchModeNavigation
        id="swiftplay"
        label="Swiftplay"
      />
      <MatchModeNavigation
        id="deathmatch"
        label="Deathmatch"
      />
      <MatchModeNavigation
        id="teamdeathmatch"
        label="Team Deathmatch"
      />
    </div>
  )
}