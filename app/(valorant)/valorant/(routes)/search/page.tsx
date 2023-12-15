import { SearchBarArea } from '@/components/navigation/search-bar-area';
import { getProfiles } from '@/lib/get-profiles';

const SearchPage = () => {
  return (
    <div className="h-full w-full items-center">
      <SearchBarArea />
    </div>
  );
};

export default SearchPage;
