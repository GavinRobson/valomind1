import { LeagueNavigationHeader } from "@/components/league-navigation/league-navigation-header";


const LeaguePageLayout = async ({
  children,
}: { children: React.ReactNode }) => {
  return ( 
    <div className="w-full">

      <div className="hidden w-full h-[60px] z-30 md:flex flex-row fixed inset-x-0">
        <LeagueNavigationHeader />
      </div>
      <main className="pt-[60px] h-full">
        {children}
      </main>
    </div>
   );
}
 
export default LeaguePageLayout;