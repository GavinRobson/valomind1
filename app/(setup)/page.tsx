import { initialProfile } from "@/lib/initial-profile"
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect} from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();

  if (!profile) {
    return redirectToSignIn();
  }
  
  return redirect(`/valorant`)
  
}

export default SetupPage;