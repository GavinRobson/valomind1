"use client";

import { cn } from "@/lib/utils";
import { Prisma } from "@prisma/client"
import Image from "next/image"
import getAgentColor from "@/hooks/get-agent-color";
import JsonifyData from "@/hooks/jsonify-data";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MatchDisplayProps {
  id: string,
  data: Prisma.JsonValue,
  mode: string,
  won?: boolean | null
}

export const MatchSidebarItem = ({
  id,
  data,
  mode,
  won,
}: MatchDisplayProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

 const splitPathname =  pathname.split('/');

  const matchJson = JsonifyData(data);
  const colors = getAgentColor();
  if (searchParams.get('mode')?.toLowerCase().trim() !== matchJson.meta.mode.toLowerCase().replace(" ", "")) {
    return null;
  }


  if (!data) {
    return (
      <div className="font-bold text-lg">
        Error
     </div>
    )
  }

  const onClick = () => {
    router.push(`/${splitPathname[1]}/${splitPathname[2]}/${splitPathname[3]}/match/${id}?${searchParams}`)
  }



  const agent = colors.data.find((data: any) => data.uuid === matchJson.stats.character.id);
  const agentColor = `#${agent?.backgroundGradientColors[0].toUpperCase().substring(0, 6)}`

  return (
    <button onClick={onClick} style={{backgroundImage: `url(https://media.valorant-api.com/maps/${matchJson.meta.map.id}/listviewicon.png)`}} className="group w-[300px] h-[60px] rounded-md flex flex-row items-center ring-[2px] ring-inset ring-black">
      <div className={cn(
        "pl-[4px] bg-white rounded-r-full transition-all duration-100 w-[4px] h-[8px] group-hover:h-[20px]",
        pathname.includes(id) && "group-hover:h-[20px]",
        pathname.includes(id) ? "h-[40px] group-hover:h-[30px] bg-[#FB5454]" : "h-[8px]",
        (won && pathname.includes(id)) && "bg-[#7AE582]",
        (won === null && pathname.includes(id)) && "bg-[#F4E869]"
      )}/>
      <div className="pl-[8px] items-center h-full flex rounded-md flex-row">
        <Image
          src={`https://media.valorant-api.com/agents/${matchJson.stats.character.id}/displayicon.png`}
          alt={matchJson.stats.character.name}
          width={50}
          height={50}
          className="rounded-md max-w-[50px]"
          style={{ backgroundColor: agentColor}}
        />
      </div>
      <div className="ml-2 items-center">
        {`${matchJson.stats.kills}/${matchJson.stats.deaths}/${matchJson.stats.assists}`}
      </div>
      <div className="pl-4 flex flex-row items-center">
        {
          mode === 'Competitive' || mode === 'Unrated' ?
            <div className="bg-[#313338] rounded-md">
              <span className="text-[#7AE582] pl-2">{matchJson.stats.team === 'Blue' ? matchJson.teams.blue : matchJson.teams.red}</span>
              <span>:</span>
              <span className="text-[#FB5454] pr-2">{matchJson.stats.team === 'Blue' ? matchJson.teams.red : matchJson.teams.blue}</span>
            </div>
          : 
          <div className="bg-[#313338] rounded-md">
            <span>{mode}</span>
          </div>
        }
      </div>
      <div className="items-center pr-2 mx-auto justify-end">
          {matchJson.meta.map.name}      
      </div>

    </button>
  )
}