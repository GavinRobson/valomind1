import { NavigationHeader } from '@/components/navigation/navigation-header';

const ValorantPageLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full">
      <div className="hidden w-full h-[60px] z-30 md:flex flex-row fixed inset-x-0">
        <NavigationHeader />
      </div>
      <main className="pt-[60px] h-full">{children}</main>
    </div>
  );
};

export default ValorantPageLayout;
