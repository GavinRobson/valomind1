'use client';

import { Users2 } from 'lucide-react';
import Image from 'next/image';

import rankData from '@/rank-data.json';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ValorantMatchProps {
  matchData: any;
  puuid?: String;
}

const partyColors: any[][] = [
  ['#4689a3', '#187396'],
  ['#bd3e3e', '#a81616'],
];

export const ValorantMatch = ({ matchData, puuid }: ValorantMatchProps) => {
  const { all_players } = matchData.data.players;
  const currentTeam = all_players.find(
    (player: any) => player.puuid === puuid
  ).team;

  const team =
    currentTeam === 'Blue'
      ? matchData.data.players.blue
      : matchData.data.players.red;
  const team0 =
    currentTeam === 'Blue'
      ? matchData.data.players.red
      : matchData.data.players.blue;
  // const team1_average_rank = Math.round(
  //   team.reduce((acc: number, player: any) => acc + player.currenttier, 0) /
  //     team.length
  // );
  // const team2_average_rank = Math.round(
  //   team0.reduce((acc: number, player: any) => acc + player.currenttier, 0) /
  //     team0.length
  // );

  const partyCombinations = getPartyCombinations(all_players, currentTeam);

  const gradient_blue = `linear-gradient(to right, #2576b8, transparent 100px)`;
  const gradient_red = `linear-gradient(to right, #FB5454, transparent 100px)`;
  const gradient_self = `linear-gradient(to right, #968233, transparent 100px)`;
  const gold_color = '#968233';

  const team1 = orderPlayers(team);
  const team2 = orderPlayers(team0);
  return (
    <div
      style={{ height: 'calc(100vh - 120px)', width: 'calc(100vw - 300px' }}
      className="h-full w-screen text-white overflow-hidden px-4 pb-[60px] flex"
    >
      <div className="bg-[#404952] w-full flex flex-col items-center justify-center flex-1">
        <div className="flex flex-col w-full justify-center h-1/2">
          {team1.map((player: any, i: number) => {
            const gradient =
              puuid === player.puuid ? gradient_self : gradient_blue;
            const background = i % 2 === 0 ? '#0C1C24' : '#11232e';
            const party = partyCombinations.find((combination) => {
              return combination.some(
                (p) =>
                  p.puuid === puuid &&
                  combination.some((q) => q.puuid === player.puuid)
              );
            });
            const inSameParty = partyCombinations.some((combination) => {
              return combination.some((p) => p.puuid === player.puuid);
            });
            const partyColor = party
              ? gold_color
              : inSameParty
              ? partyCombinations.find((combination) => {
                  return combination.some((p) => p.puuid === player.puuid);
                })?.[2]
              : undefined;
            const plusMinus = player.stats.kills - player.stats.deaths;
            return (
              <div
                className="w-full flex h-1/2 p-[1px]"
                style={{ backgroundColor: background }}
              >
                <div
                  key={player.puuid}
                  style={{ background: gradient }}
                  className="flex flex-row items-center justify-between p-2"
                >
                  <div className="flex flex-row items-center space-x-2 w-[250px]">
                    <Image
                      src={player.assets.agent.small}
                      alt={player.character}
                      width={40}
                      height={40}
                    />
                    <div className="whitespace-nowrap">{player.name}</div>
                    {inSameParty && <Users2 size={20} color={partyColor} />}
                  </div>
                  <div className="flex flex-row items-center space-x-2 ml-2">
                    <div className="w-[6rem] flex flex-col items-center">
                      <Tooltip>
                        <TooltipTrigger className="cursor-default">
                          <Image
                            src={
                              rankData.rankData[player.currenttier].smallIcon
                            }
                            alt="RANK"
                            width={35}
                            height={35}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {player.currenttier_patched}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="w-[6rem] flex justify-center">
                      {player.stats.score}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {player.stats.kills}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {player.stats.deaths}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {player.stats.assists}
                    </div>
                    <div
                      className={cn(
                        'w-[4rem] flex justify-center',
                        plusMinus > 0
                          ? 'text-[#7AE582]'
                          : plusMinus < 0
                          ? 'text-[#FB5454]'
                          : 'text-white'
                      )}
                    >
                      {plusMinus > 0 ? `+${plusMinus}` : `${plusMinus}`}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {Math.round(
                        (player.stats.kills / player.stats.deaths) * 10
                      ) / 10}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-500 w-full my-10"></div>
        <div className="flex flex-col w-full justify-center h-1/2">
          {team2.map((player: any, i: number) => {
            const gradient =
              puuid === player.puuid ? gradient_self : gradient_red;
            const background = i % 2 === 0 ? '#0C1C24' : '#11232e';
            const inSameParty = partyCombinations.some((combination) => {
              return combination.some((p) => p.puuid === player.puuid);
            });
            const partyColor = partyCombinations.find((combination) => {
              return combination.some((p) => p.puuid === player.puuid);
            })?.[2];
            const plusMinus = player.stats.kills - player.stats.deaths;
            return (
              <div
                className="w-full flex h-1/2 p-[1px]"
                style={{ backgroundColor: background }}
              >
                <div
                  key={player.puuid}
                  style={{ background: gradient }}
                  className="flex items-center justify-between p-2"
                >
                  <div className="flex flex-row items-center space-x-2 w-[250px]">
                    <Image
                      src={player.assets.agent.small}
                      alt={player.character}
                      width={40}
                      height={40}
                    />
                    <div>{player.name}</div>
                    {inSameParty && (
                      <Users2
                        size={20}
                        className="text-gray-400"
                        color={partyColor}
                      />
                    )}
                  </div>
                  <div className="flex flex-row items-center space-x-2 ml-2">
                    <div className="w-[6rem] flex flex-col items-center">
                      <Tooltip>
                        <TooltipTrigger className="cursor-default">
                          <Image
                            src={
                              rankData.rankData[player.currenttier].smallIcon
                            }
                            alt="RANK"
                            width={35}
                            height={35}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {player.currenttier_patched}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="w-[6rem] flex justify-center">
                      {player.stats.score}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {player.stats.kills}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {player.stats.deaths}
                    </div>
                    <div className="w-[4rem] flex justify-center ">
                      {player.stats.assists}
                    </div>
                    <div
                      className={cn(
                        'w-[4rem] flex justify-center',
                        plusMinus > 0
                          ? 'text-[#7AE582]'
                          : plusMinus < 0
                          ? 'text-[#FB5454]'
                          : 'text-white'
                      )}
                    >
                      {plusMinus > 0 ? `+${plusMinus}` : `${plusMinus}`}
                    </div>
                    <div className="w-[4rem] flex justify-center">
                      {Math.round(
                        (player.stats.kills / player.stats.deaths) * 10
                      ) / 10}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function orderPlayers(players: any, mode?: string) {
  if (!mode || mode === null) {
    const orderedPlayers = players.sort(function (a: any, b: any) {
      return b.stats.score - a.stats.score;
    });
    return orderedPlayers;
  }

  const orderedPLayers = players.sort(function (a: any, b: any) {
    return b.stats[mode] - a.stats[mode];
  });
  return orderedPLayers;
}

function getPartyCombinations(players: any[], currentTeam: string): any[][] {
  const parties: any = {};
  const combinations: any[][] = [];

  players.forEach(
    (player: { puuid: string; party_id: string; team: string }) => {
      if (!parties[player.party_id]) {
        parties[player.party_id] = {
          players: [],
          team: player.team,
          color: '',
        };
      }
      parties[player.party_id].players.push(player);
    }
  );

  Object.values(parties).forEach((party: any, i) => {
    const team = party.team === currentTeam ? 0 : 1;
    const partyColor = partyColors[team][i % 2];
    party.color = partyColor;
    if (party.players.length > 1) {
      for (let i = 0; i < party.players.length; i++) {
        for (let j = i + 1; j < party.players.length; j++) {
          combinations.push([party.players[i], party.players[j], party.color]);
        }
      }
    }
  });

  return combinations;
}
