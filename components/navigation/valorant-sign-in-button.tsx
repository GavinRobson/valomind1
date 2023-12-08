"use client";

import { useRouter } from "next/navigation";

export const ValorantSignInButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/valorant-sign-in')
  }

  return (
    <button onClick={onClick} className="hover:text-[#FB5454]">Link Valorant</button>
  )
}