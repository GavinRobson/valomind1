import { getProfiles } from '@/lib/get-profiles';
import { SearchBar } from './search-bar';

export const SearchBarArea = async () => {
  const profiles = await getProfiles();
  return (
    <div className="h-1/4 items-center">
      <SearchBar profiles={profiles} />
    </div>
  );
};
