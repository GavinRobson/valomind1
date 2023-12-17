'use client';

import { ChevronLeft, Divide } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';

export const Dropdown = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button onClick={handleClick} className="relative p-2 group">
      <ChevronLeft
        className={cn(
          'transition-all hover:-rotate-90',
          isActive && '-rotate-90'
        )}
      />
      {isActive && (
        <div className="absolute flex flex-col h-[200px] transition-all bg-[#1E1F22] text-sm text-white rounded-md">
          <ScrollArea>
            <div className="p-4">
              <div className="">Competitive</div>
              <div className="my-4">Unrated</div>
              <div className="my-4">Swiftplay</div>
              <div className="my-4">Deathmatch</div>
              <div className="my-4">Team Deathmatch</div>
              <div className="my-4">Spike Rush</div>
              <div className="my-4">Escalation</div>
              <div className="">Replication</div>
            </div>
          </ScrollArea>
        </div>
      )}
    </button>
  );
};
