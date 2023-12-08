import { ValorantMatchArea } from "@/components/match/valorant-match-area";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

const MatchIdPage = async ({
  params,
}: { params: { accountId: string, matchId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  return ( 
    <div className="h-full flex">
      <ValorantMatchArea
      matchId={params.matchId}
      puuid={profile.valorantProfile?.puuid}
      />
    </div>
   );
}
 
export default MatchIdPage;