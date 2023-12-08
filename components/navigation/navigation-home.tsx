"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const NavigationHome = () => {
  const router = useRouter();

  const handleHome = () => {
    return router.push('/valorant/home');
  }
  return (
    <div>
      <button onClick={handleHome} className="flex items-center">
        <div className="rounded-lg hover:bg-zinc-800 transition-all duration-300 ease-in-out duration-600 flex h-full w-full">
          <Image
            src="/images/valomind-logo.png"
            alt="Logo"
            width={60}
            height={60}
          />
        </div>
      </button>

    </div>
  )
}