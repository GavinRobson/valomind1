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
      redirect(`/valorant/accounts/${account.id}`)
    );
  }

  return <ValorantLinkModal />
}
 
export default ValorantSignIn;