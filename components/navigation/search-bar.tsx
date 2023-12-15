'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface SearchBarProps {
  profiles: any;
}

export const SearchBar = ({ profiles }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (search === '') {
      params.delete('search');
    } else {
      params.set('search', search.toLowerCase());
    }
    replace(`${pathname}?${params}`);
  }, [search]);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="h-full w-1/4 flex items-center">
      <input
        placeholder=" "
        className="block rounded-md px-1 h-1/2 w-full text-xs text-white bg-neutral-700 appearance-none peer focus:outline-none focus:ring-0"
        onChange={(ev) => setSearch(ev.target.value)}
        onFocus={handleOpen}
        onBlur={handleOpen}
      />
      <label
        htmlFor="search"
        className="
        absolute 
        text-xs 
        text-zinc-400 
        duration-150 
        transform
        -translate-y-3 
        scale-75 
        px-1
        z-10 
        peer-placeholder-shown:scale-100 
        peer-placeholder-shown:translate-y-0 
        peer-focus:opacity-0"
      >
        Search
      </label>
    </div>
  );
};
