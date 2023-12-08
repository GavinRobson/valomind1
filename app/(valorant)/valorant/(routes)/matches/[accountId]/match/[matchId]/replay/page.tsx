import { ValorantReplayArea } from "@/components/match/replay/valorant-replay-area";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const ReplayPage = async ({
  params,
}: { params: {accountId: string, matchId: string} }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return ( 
    <div className="h-full w-full">
      <ValorantReplayArea
        matchId={params.matchId}
        puuid={profile.valorantProfile?.puuid}
      />
    </div>
   );
}
 
export default ReplayPage;