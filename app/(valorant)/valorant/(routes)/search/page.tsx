import Footer from '@/components/navigation/footer';
import { SearchBarArea } from '@/components/navigation/search-bar-area';

const SearchPage = () => {
  return (
    <>
      <div className="h-screen w-full items-center">
        <SearchBarArea />
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
