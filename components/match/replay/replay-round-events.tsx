'use client';

import { Scissors } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

interface ReplayRoundEventsProps {
  roundData: any;
}

export const ReplayRoundEvents = ({ roundData }: ReplayRoundEventsProps) => {
  const [round, setRound] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const eventQuery = params.get('event');
  const event = eventQuery !== null ? parseInt(eventQuery) : 0;
  const mode = params.get('mode');

  const events = sortKillEventsWithPlantsDefuses(roundData);

  useEffect(() => {
    const roundQuery = params.get('round');
    const newRound = roundQuery !== null ? parseInt(roundQuery) : 0;
    setRound(newRound);
  }, [params]);

  const onClick = useCallback(
    (ev: number) => (e: React.MouseEvent<HTMLElement>) => {
      router.push(`${pathname}?mode=${mode}&round=${round}&event=${ev}`);
    },
    [router, pathname, mode, round]
  );

  return (
    <div className="w-full justify-between flex flex-row h-[60px]">
      {events.map((e: any, i: number) => {
        const background =
          event === i ? '#11235e' : i % 2 === 0 ? '#0C1C24' : '#11232e';

        const killer = e.killer_display_name;
        const victim = e.victim_display_name;
        return (
          <button
            className="flex flex-col items-center w-full justify-center transition-all hover:opacity-75"
            style={{ backgroundColor: background }}
            onClick={onClick(i)}
          >
            <div className="text-sm flex flex-row space-x-5">
              {e.event === 'plant' ? (
                <Image
                  src="/images/plant_icon.png"
                  alt="Plant Icon"
                  height={40}
                  width={40}
                />
              ) : e.event === 'defuse' ? (
                <Scissors />
              ) : e.event === 'start' ? (
                <div>Start of Round</div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="text-xs">{killer.split('#')[0]}</div>
                  <Image
                    src={e.damage_weapon_assets.killfeed_icon}
                    alt="Killer Gun"
                    height={30}
                    width={50}
                  />
                  <div className="text-xs">{victim.split('#')[0]}</div>
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

function sortKillEventsWithPlantsDefuses(round: any): any[] {
  const allEvents: any[] = [];
  allEvents.push({ kill_time_in_round: 0, event: 'start' });
  round.player_stats.forEach((playerStats: any) => {
    // Add kill events to the main array
    allEvents.push(...playerStats.kill_events);
  });

  if (round.plant_events && round.plant_events.plant_location !== null) {
    allEvents.push({
      kill_time_in_round: round.plant_events.plant_time_in_round,
      event: 'plant',
    });
  }

  if (round.defuse_events && round.defuse_events.defuse_location !== null) {
    allEvents.push({
      kill_time_in_round: round.defuse_events.defuse_time_in_round,
      event: 'defuse',
    });
  }

  // Sort the main array based on kill_time_in_round
  allEvents.sort((a, b) => a.kill_time_in_round - b.kill_time_in_round);

  return allEvents;
}
