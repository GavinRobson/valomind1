"use client";

import { useRouter } from "next/navigation";
import Image from 'next/image';

interface GameSwapProps {
  path: string,
}

export const GameSwap = ({
  path
}: GameSwapProps) => {
  const router = useRouter();
  const onClick = () => { 
    router.push(`/${path}/home`)
  }
  
  const imageUrl = path === 'valorant' ? '/images/valorant-official-logo.png' : '/images/league-official-logo.png';

  return (
    <div className="flex flex-row space-x-5 cursor-pointer">
      <Image onClick={onClick} src={imageUrl} alt="GameLogo" height={40} width={40} className="hover:opacity-75 transition"/>
    </div>
  );
}