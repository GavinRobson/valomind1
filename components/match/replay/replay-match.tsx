'use client';

import Image from 'next/image';
import { ReplayTimeline } from './replay-timeline';
import { ReplayMap } from './replay-map';
import { useSearchParams } from 'next/navigation';
import { ReplayRoundEvents } from './replay-round-events';

interface ReplayMatchProps {
  replayData: any;
  puuid?: string;
}

export const ReplayMatch = ({ replayData, puuid }: ReplayMatchProps) => {
  const params = useSearchParams();
  const roundQuery = params.get('round');
  const eventQuery = params.get('event');

  const round = roundQuery !== null ? parseInt(roundQuery) : 0;
  const roundData = replayData.data.rounds[round];
  const events = sortKillEventsWithPlantsDefuses(roundData);
  const event = eventQuery !== null ? parseInt(eventQuery) : 0;

  const { all_players } = replayData.data.players;
  const currentTeam = all_players.find(
    (player: any) => player.puuid === puuid
  ).team;

  const team =
    currentTeam === 'Blue'
      ? replayData.data.players.blue
      : replayData.data.players.red;
  const team0 =
    currentTeam === 'Blue'
      ? replayData.data.players.red
      : replayData.data.players.blue;

  const gradient_blue = `linear-gradient(to right, #2576b8, transparent 100px)`;
  const gradient_red = `linear-gradient(to right, #FB5454, transparent 100px)`;
  const gradient_self = `linear-gradient(to right, #968233, transparent 100px)`;

  const team1 = orderPlayers(team);
  const team2 = orderPlayers(team0);

  const mapSrc = getMapSource(replayData.data.metadata.map);
  const mapLocations = getMapLocations(replayData.data.metadata.map);

  return (
    <div
      style={{ height: 'calc(100vh - 120px)', width: 'calc(100vw - 300px' }}
      className="h-full w-screen text-white overflow-hidden px-4 pb-[60px] flex"
    >
      <div className="bg-[#404952] w-1/4 flex flex-col justify-center flex-1">
        <div className="flex flex-row h-[60px]">
          <ReplayTimeline data={replayData} team={currentTeam} />
        </div>
        <div className="w-full h-full pt-[25px] flex flex-row justify-center flex-1">
          <div className="flex flex-col w-full justify-center h-1/2 px-4">
            {team1.map((player: any, i: number) => {
              const playerRoundData = roundData.player_stats.find(
                (p: any) => p.player_puuid === player.puuid
              );

              const armorImg =
                playerRoundData.economy.armor.assets.display_icon !== null
                  ? playerRoundData.economy.armor.assets.display_icon
                  : null;
              const weaponImg =
                playerRoundData.economy.weapon.assets.killfeed_icon !== null
                  ? playerRoundData.economy.weapon.assets.killfeed_icon
                  : 'https://media.valorant-api.com/weapons/2f59173c-4bed-b6c3-2191-dea9b58be9c7/killstreamicon.png';

              const gradient =
                puuid === player.puuid ? gradient_self : gradient_blue;
              const background = i % 2 === 0 ? '#0C1C24' : '#11232e';
              const isDead = events.some(
                (e: any, i: number) =>
                  i <= event && e.victim_puuid === player.puuid
              );
              const opacity = isDead ? '40%' : '100%';

              return (
                <div
                  className="w-full flex h-1/2 p-[1px]"
                  style={{ backgroundColor: background, opacity: opacity }}
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
                      <div className="whitespace-nowrap truncate">
                        {player.name}
                      </div>
                    </div>
                    <div className="flex w-full flex-row items-center space-x-2">
                      <div className="w-full h-full text-sm flex flex-col">
                        <div className="w-full">
                          Spent: {playerRoundData.economy.spent}
                        </div>
                        <div className="w-full">
                          Current: {playerRoundData.economy.remaining}
                        </div>
                      </div>

                      <Image
                        src={weaponImg}
                        alt="Weapon"
                        width={60}
                        height={100}
                      />
                      {armorImg !== null ? (
                        <Image
                          src={
                            playerRoundData.economy.armor.assets.display_icon
                          }
                          alt="Armor"
                          width={30}
                          height={30}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-[500px] h-[400px] pt-[97px] items-center justify-center flex">
            <ReplayMap
              image={mapSrc}
              roundData={roundData}
              mapData={mapLocations}
              playerData={replayData.data.players.all_players}
            />
          </div>
          <div className="flex flex-col w-full justify-center h-1/2 px-4">
            {team2.map((player: any, i: number) => {
              const playerRoundData = roundData.player_stats.find(
                (p: any) => p.player_puuid === player.puuid
              );

              const armorImg =
                playerRoundData.economy.armor.assets.display_icon !== null
                  ? playerRoundData.economy.armor.assets.display_icon
                  : null;
              const weaponImg =
                playerRoundData.economy.weapon.assets.killfeed_icon !== null
                  ? playerRoundData.economy.weapon.assets.killfeed_icon
                  : 'https://media.valorant-api.com/weapons/2f59173c-4bed-b6c3-2191-dea9b58be9c7/killstreamicon.png';

              const gradient =
                puuid === player.puuid ? gradient_self : gradient_red;
              const background = i % 2 === 0 ? '#0C1C24' : '#11232e';
              const isDead = events.some(
                (e: any, i: number) =>
                  i <= event && e.victim_puuid === player.puuid
              );
              const opacity = isDead ? '40%' : '100%';
              return (
                <div
                  className="w-full flex h-1/2 p-[1px]"
                  style={{ backgroundColor: background, opacity: opacity }}
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
                      <div className="whitespace-nowrap truncate">
                        {player.name}
                      </div>
                    </div>
                    <div className="flex w-full flex-row items-center space-x-2">
                      <div className="w-full h-full text-sm flex flex-col">
                        <div className="w-full">
                          Spent: {playerRoundData.economy.spent}
                        </div>
                        <div className="w-full">
                          Current: {playerRoundData.economy.remaining}
                        </div>
                      </div>

                      <Image
                        src={weaponImg}
                        alt="Weapon"
                        width={60}
                        height={100}
                      />
                      {armorImg !== null ? (
                        <Image
                          src={
                            playerRoundData.economy.armor.assets.display_icon
                          }
                          alt="Armor"
                          width={30}
                          height={30}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <ReplayRoundEvents roundData={roundData} />
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

function getMapSource(mapName: string) {
  if (mapName == 'Ascent') {
    return 'https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/displayicon.png';
  } else if (mapName == 'Split') {
    return 'https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/displayicon.png';
  } else if (mapName == 'Fracture') {
    return 'https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/displayicon.png';
  } else if (mapName == 'Bind') {
    return 'https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/displayicon.png';
  } else if (mapName == 'Breeze') {
    return 'https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/displayicon.png';
  } else if (mapName == 'Lotus') {
    return 'https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/displayicon.png';
  } else if (mapName == 'Sunset') {
    return 'https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/displayicon.png';
  } else if (mapName == 'Pearl') {
    return 'https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/displayicon.png';
  } else if (mapName == 'Icebox') {
    return 'https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/displayicon.png';
  } else if (mapName == 'Haven') {
    return 'https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/displayicon.png';
  } else if (mapName == 'Abyss') {
    return 'https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/displayicon.png'
  }
}

function sortKillEventsWithPlantsDefuses(round: any): any[] {
  const allEvents: any[] = [];
  allEvents.push({
    kill_time_in_round: 0,
    event: 'start',
    player_locations_on_kill: 'start',
  });
  round.player_stats.forEach((playerStats: any) => {
    // Add kill events to the main array
    allEvents.push(...playerStats.kill_events);
  });

  if (round.plant_events && round.plant_events.plant_location !== null) {
    const player_locations: any[] = [];

    round.plant_events.player_locations_on_plant.forEach((player: any) => {
      player_locations.push(player);
    });
    allEvents.push({
      kill_time_in_round: round.plant_events.plant_time_in_round,
      event: 'plant',
      player_locations_on_kill: player_locations,
      plant_events: round.plant_events,
    });
  }

  if (round.defuse_events && round.defuse_events.defuse_location !== null) {
    const player_locations: any[] = [];

    round.defuse_events.player_locations_on_defuse.forEach((player: any) => {
      player_locations.push(player);
    });

    allEvents.push({
      kill_time_in_round: round.defuse_events.defuse_time_in_round,
      event: 'defuse',
      player_locations_on_kill: player_locations,
      defuse_events: round.defuse_events,
    });
  }

  // Sort the main array based on kill_time_in_round
  allEvents.sort((a, b) => a.kill_time_in_round - b.kill_time_in_round);

  return allEvents;
}

function getMapLocations(map: string) {
  if (map === 'Ascent') {
    return {
      xMultiplier: 0.00007,
      yMultiplier: -0.00007,
      xScalarToAdd: 0.813895,
      yScalarToAdd: 0.573242,
    };
  }
  if (map === 'Split') {
    return {
      xMultiplier: 0.000078,
      yMultiplier: -0.000078,
      xScalarToAdd: 0.842188,
      yScalarToAdd: 0.697578,
    };
  }
  if (map === 'Fracture') {
    return {
      xMultiplier: 0.000078,
      yMultiplier: -0.000078,
      xScalarToAdd: 0.556952,
      yScalarToAdd: 1.155886,
    };
  }
  if (map === 'Bind') {
    return {
      xMultiplier: 0.000059,
      yMultiplier: -0.000059,
      xScalarToAdd: 0.576941,
      yScalarToAdd: 0.967566,
    };
  }
  if (map === 'Breeze') {
    return {
      xMultiplier: 0.00007,
      yMultiplier: -0.00007,
      xScalarToAdd: 0.465123,
      yScalarToAdd: 0.833078,
    };
  }
  if (map === 'Lotus') {
    return {
      xMultiplier: 0.000072,
      yMultiplier: -0.000072,
      xScalarToAdd: 0.454789,
      yScalarToAdd: 0.917752,
    };
  }
  if (map === 'Sunset') {
    return {
      xMultiplier: 0.000078,
      yMultiplier: -0.000078,
      xScalarToAdd: 0.5,
      yScalarToAdd: 0.515625,
    };
  }
  if (map === 'Pearl') {
    return {
      xMultiplier: 0.000078,
      yMultiplier: -0.000078,
      xScalarToAdd: 0.480469,
      yScalarToAdd: 0.916016,
    };
  }
  if (map === 'Icebox') {
    return {
      xMultiplier: 0.000072,
      yMultiplier: -0.000072,
      xScalarToAdd: 0.460214,
      yScalarToAdd: 0.304687,
    };
  }
  if (map === 'Haven') {
    return {
      xMultiplier: 0.000075,
      yMultiplier: -0.000075,
      xScalarToAdd: 1.09345,
      yScalarToAdd: 0.642728,
    };
  }
  if (map === 'Abyss') {
    return {
      xMultiplier: 0.000081,
      yMultiplier: -0.000081,
      xScalarToAdd: 0.5,
      yScalarToAdd: 0.5,
    }
  }
}
