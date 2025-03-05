import Loading from "@/app/loading";
import { MatchOverviewHeader } from "@/components/match/match-overview-header";
import { MatchSidebar } from "@/components/match/match-sidebar";
import React from "react";

const ValorantMatchLayout = ({
  children,
  params,
}: {
    children: React.ReactNode;
    params: {accountId: string}
  }) => {
  return ( 
    <div className="w-full">
      <div className="hidden w-full h-[60px] z-30 md:flex flex-row fixed inset-x-0">
        <MatchOverviewHeader
          params={params}
        />
      </div>
      <div className="hidden h-screen pt-[60px] w-[300px] z-20 md:flex flex-col fixed inset-y-0">
        <MatchSidebar
          params={params}
        />
      </div>
      <div className="fixed h-screen ml-[300px] pt-[60px]">
        {children}
      </div>  
    </div>
   );
}
 
export default ValorantMatchLayout;