import { getProfiles } from '@/lib/get-profiles';
import { SearchBarTest } from './search-bar-test';

export const SearchBarArea = async () => {
  const profiles = await getProfiles();
  return (
    <div className="h-full items-center">
      <SearchBarTest profiles={profiles} />
    </div>
  );
};
