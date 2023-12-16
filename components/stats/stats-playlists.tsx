"use client"

import { Dropdown } from "./dropdown";

export const StatsPlaylists = () => {
  return (
    <div className='w-full bg-white text-black flex flex-row items-center rounded-md col-span-2'>
      <button className="h-full flex items-center justify-center flex-1">
        <span>Competitive</span>
      </button>
      <button className="h-full flex items-center justify-center flex-1">
        <span>Unrated</span>
      </button>
      <button className="h-full flex items-center justify-center flex-1">
        <span>Swiftplay</span>
      </button>
      <button className="h-full flex items-center justify-center flex-1">
        <span>Team Deathmatch</span>
      </button>
      <Dropdown />
    </div>
  );
}