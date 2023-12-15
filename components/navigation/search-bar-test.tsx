'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface SearchBarTestProps {
  profiles: any;
}

export const SearchBarTest = ({ profiles }: SearchBarTestProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = useCallback(
    (id: string) => (e: React.MouseEvent<HTMLElement>) => {
      console.log('hello');
      router.push(`/valorant/stats/account/${id}`);
    },
    [pathname]
  );

  console.log(profiles);

  return (
    <div className="flex flex-col h-full items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-1/4 h-full flex items-center rounded-md pt-10">
          <input
            placeholder=" "
            className="block rounded-md w-full px-4 pt-4 h-[50px] text-sm text-white bg-neutral-700 appearance-none peer focus:outline-none focus:ring-0"
            onChange={(ev) => setSearch(ev.target.value)}
          />
          <label
            htmlFor="search"
            className="
        
        absolute
        text-md
        text-zinc-400 
        duration-150 
        transform
        -translate-y-3 
        scale-75 
        px-2
        z-10
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:-translate-y-3
        peer-focus:scale-75
        peer-focus:-translate-x-3
        "
          >
            Search Profiles
          </label>
        </div>
      </div>
      {search !== '' ? (
        <div className="flex flex-col w-1/4 h-full pt-2 items-center">
          {profiles.map((profile: any) => {
            if (
              profile.valorantProfile.username
                .toLowerCase()
                .substring(0, search.length)
                .includes(search.toLowerCase())
            ) {
              return (
                <button
                  onClick={handleClick(profile.id)}
                  className="h-[50px] w-full bg-neutral-500 items-center flex justify-center"
                >{`${profile.valorantProfile.username}#${profile.valorantProfile.tag}`}</button>
              );
            }
          })}
        </div>
      ) : null}
    </div>
  );
};
