'use client';

import { ChevronUpCircle, Scissors } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlayerIcon } from './player-icon';

interface ReplayMapProps {
  image: string;
  roundData: any;
  mapData: any;
  playerData: any;
}

export const ReplayMap = ({
  image,
  roundData,
  mapData,
  playerData,
}: ReplayMapProps) => {
  console.log(playerData);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [event, setEvent] = useState(0);
  const [round, setRound] = useState(0);
  const params = useSearchParams();
  const pathname = usePathname();

  const handleZoomIn = () => {
    console.log(zoom);
    setZoom((prevZoom) => prevZoom * 1.1); // Increase zoom level by 10%
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom / 1.1, 1)); // Ensure minimum zoom is 1

    // Center the map when zoom level is exactly 1
    if (zoom <= 1) {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: any) => {
    if (zoom > 1) {
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: any) => {
    if (zoom > 1 && dragStart.x !== 0 && dragStart.y !== 0) {
      const offsetX = e.clientX - dragStart.x;
      const offsetY = e.clientY - dragStart.y;

      setDragOffset((prevOffset) => ({
        x: prevOffset.x + offsetX,
        y: prevOffset.y + offsetY,
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragStart({ x: 0, y: 0 });
  };

  useEffect(() => {
    const eventQuery = params.get('event');
    const newEvent = eventQuery !== null ? parseInt(eventQuery) : 0;

    const roundQuery = params.get('round');
    const newRound = roundQuery !== null ? parseInt(roundQuery) : 0;

    setEvent(newEvent);
    setRound(newRound);
  }, [params, round, event, pathname]);

  const events = sortKillEventsWithPlantsDefuses(roundData);
  const eventData = events[event];
  const player_locations = eventData.player_locations_on_kill;

  if (eventData.event === 'start') {
    return (
      <div className="bg-[#0C1C24] w-[500px] h-[500px] flex justify-center items-center">
        <Image
          src={image}
          alt="Map"
          width={500}
          height={500}
          className="relative z-0"
        />
      </div>
    );
  }

  if (eventData.event === 'plant') {
    const plant_x =
      eventData.plant_events.plant_location.y * mapData.xMultiplier +
      mapData.xScalarToAdd;
    const plant_y =
      eventData.plant_events.plant_location.x * mapData.yMultiplier +
      mapData.yScalarToAdd;
    const plant_loc_x = plant_x * 500;
    const plant_loc_y = plant_y * 500;
    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative bg-[#0C1C24] w-[500px] h-[500px] overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-2 z-50">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
        <div
          className="overflow-hidden"
          style={{
            transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          }}
        >
          <Image
            src={image}
            alt="Map"
            width={500}
            height={500}
            className="relative z-0"
          />
          <div className="w-[500px] h-[500px] absolute -top-1 -left-1">
            <div
              style={{ left: plant_loc_x, top: plant_loc_y }}
              className="absolute z-10 text-white items-center justify-center"
            >
              <Image
                src="/images/plant_icon.png"
                alt="Plant Icon"
                height={10}
                width={10}
              />
            </div>
            {player_locations.map((player: any) => {
              const x_pos =
                player.location.y * mapData?.xMultiplier +
                mapData?.xScalarToAdd;
              const y_pos =
                player.location.x * mapData?.yMultiplier +
                mapData?.yScalarToAdd;
              const x = x_pos * 500;
              const y = y_pos * 500;
              const radians = `${player.view_radians}rad`;
              const color = player.player_team === 'Blue' ? 'Blue' : 'Red';
              const agentIcon = playerData.find(
                (p: any) => p.puuid === player.player_puuid
              ).assets.agent.small;
              const img =
                color === 'Blue'
                  ? '/images/GreenCircle.png'
                  : '/images/RedCircle.png';
              const data = { x: x, y: y, radians: radians };
              return (
                <div
                  style={{ left: x, top: y }}
                  className="absolute z-10 text-white items-center justify-center"
                >
                  <Image
                    src={img}
                    alt="Green"
                    width={20}
                    height={20}
                    className="absolute z-20"
                    style={{ transform: 'scale(1.25)', rotate: data.radians }}
                  />
                  <PlayerIcon data={data} agent={agentIcon} color={color} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (eventData.event === 'defuse') {
    const defuse_x =
      eventData.defuse_events.defuse_location.y * mapData?.xMultiplier +
      mapData?.xScalarToAdd;
    const defuse_y =
      eventData.defuse_events.defuse_location.x * mapData.yMultiplier +
      mapData.yScalarToAdd;
    const defuse_loc_x = defuse_x * 500;
    const defuse_loc_y = defuse_y * 500;
    return (
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="relative bg-[#0C1C24] w-[500px] h-[500px] overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-2 z-50">
          <button onClick={handleZoomIn}>+</button>
          <button onClick={handleZoomOut}>-</button>
        </div>
        <div
          className="overflow-hidden"
          style={{
            transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
          }}
        >
          <Image
            src={image}
            alt="Map"
            width={500}
            height={500}
            className="relative z-0"
          />
          <div className="w-[500px] h-[500px] absolute -top-1 -left-1">
            <div
              style={{ left: defuse_loc_x, top: defuse_loc_y }}
              className="absolute z-50 text-white items-center justify-center"
            >
              <Scissors height={10} width={10} />
            </div>
            {player_locations.map((player: any) => {
              const x_pos =
                player.location.y * mapData?.xMultiplier +
                mapData?.xScalarToAdd;
              const y_pos =
                player.location.x * mapData?.yMultiplier +
                mapData?.yScalarToAdd;
              const x = x_pos * 500;
              const y = y_pos * 500;
              const radians = `${player.view_radians}rad`;
              const color = player.player_team === 'Blue' ? 'Blue' : 'Red';
              const agentIcon = playerData.find(
                (p: any) => p.puuid === player.player_puuid
              ).assets.agent.small;
              const img =
                color === 'Blue'
                  ? '/images/GreenCircle.png'
                  : '/images/RedCircle.png';
              const data = { x: x, y: y, radians: radians };
              return (
                <div
                  style={{ left: x, top: y }}
                  className="absolute z-10 text-white items-center justify-center"
                >
                  <Image
                    src={img}
                    alt="Green"
                    width={20}
                    height={20}
                    className="absolute z-20"
                    style={{ transform: 'scale(1.25)', rotate: data.radians }}
                  />
                  <PlayerIcon data={data} color={color} agent={agentIcon} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="relative bg-[#0C1C24] w-[500px] h-[500px] overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 z-50">
        <button onClick={handleZoomIn}>+</button>
        <button onClick={handleZoomOut}>-</button>
      </div>
      <div
        className="overflow-hidden"
        style={{
          transform: `scale(${zoom}) translate(${dragOffset.x}px, ${dragOffset.y}px)`,
        }}
      >
        <Image
          src={image}
          alt="Map"
          width={500}
          height={500}
          className="relative z-0"
        />
        <div className="w-[500px] h-[500px] absolute -top-1 -left-1">
          {player_locations.map((player: any) => {
            const x_pos =
              player.location.y * mapData?.xMultiplier + mapData?.xScalarToAdd;
            const y_pos =
              player.location.x * mapData?.yMultiplier + mapData?.yScalarToAdd;
            const x = x_pos * 500;
            const y = y_pos * 500;
            const radians = `${player.view_radians}rad`;
            const color = player.player_team === 'Blue' ? 'Blue' : 'Red';
            const agentIcon = playerData.find(
              (p: any) => p.puuid === player.player_puuid
            ).assets.agent.small;
            const img =
              color === 'Blue'
                ? '/images/GreenCircle.png'
                : '/images/RedCircle.png';
            const data = { x: x, y: y, radians: radians };
            return (
              <div
                style={{ left: x, top: y }}
                className="absolute z-10 text-white items-center justify-center"
              >
                <Image
                  src={img}
                  alt="Green"
                  width={20}
                  height={20}
                  className="absolute z-20"
                  style={{ transform: 'scale(1.25)', rotate: data.radians }}
                />
                <PlayerIcon data={data} agent={agentIcon} color={color} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

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
