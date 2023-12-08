import { MessagePopUp } from "@/components/modals/message-pop-up";
import { ValorantLinkModal } from "@/components/modals/val-link-modal";
import { redirectToSignIn } from "@clerk/nextjs";

import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


const ValorantSignIn = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const account = await db.valorantProfile.findFirst({
    where: {
      profileId: profile.id
    }
  });

  if (account) {
    return (
      <MessagePopUp
        message="Already linked your valorant account"
        action="Unlink"
        description="Valorant account already linked to this profile."
        accountId={profile.id}
      />
    );
  }

  return <ValorantLinkModal />
}
 
export default ValorantSignIn;