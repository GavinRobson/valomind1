import { ValorantStatsModal } from "@/components/modals/valorant-stats";
import { currentValorant } from "@/lib/current-valorant";
import { redirectToSignIn } from "@clerk/nextjs";

const AccountStatsPage = async () => {
  const valorant = await currentValorant();

  if (!valorant) {
    return redirectToSignIn();
  }

  return ( 
    <ValorantStatsModal />
   );
}
 
export default AccountStatsPage;