'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

export const SearchBar = () => {
  const [hover, setHover] = useState(false);

  const onTouchStart = () => {};

  return (
    <div className="relative h-full flex items-center justify-center px-2">
      <div
        onTouchStart={onTouchStart}
        className="text-primary transition-all duration-200 rounded-lg hover:opacity-0"
      >
        <Search height={20} width={20} />
      </div>
    </div>
  );
};
