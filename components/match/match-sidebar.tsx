import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MatchSidebarItem } from "./match-sidebar-item";
import { db } from "@/lib/db";

export const MatchSidebar = async ({
  params,
}: {
    params: { accountId: string }
  }) => {
  
  const matches = await db.match.findMany({
    where: {
      valorantProfile: {
        profileId: params.accountId
      }
    },
    orderBy: {
      matchDate: 'desc'
    }
  });
  
  if (!matches) {
    return (
      <div className="font-bold text-lg">
        No Matches Found!
      </div>
    )    
  }

  return (
    <div className="space-y-0 flex flex-col items-center justify-between h-full w-[300px] text-primary pt-[60px]">
      <ScrollArea
        className="w-[300px] flex h-full"
        hideScrollBar={true}
      >
        {matches.map((match) => (
          <div key={match.matchId} className="items-center">
            <MatchSidebarItem
              id={match.matchId}
              data={match.overview}
              mode={match.mode}
              won={match.won}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  )
}