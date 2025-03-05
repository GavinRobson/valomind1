import { currentProfile } from '@/lib/current-profile';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentValorant } from '@/lib/current-valorant';

export async function POST(req: Request) {
  try {
    const { profileId, puuid, region } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const response = await fetch(
      `https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/${region}/${puuid}?mode=competitive&api_key=HDEV-162bdfe4-d0a6-48c4-8ea6-f0cf5b907473`
    );
    const data = await response.json();

    if (data.errors) {
      return new NextResponse(`${data.errors.message}`, {
        status: data.status,
      });
    }

    const valorant = await currentValorant(profile.id);

    console.log(valorant);
    console.log(profile);

    if (!valorant) {
      return null;
    }

    let headshots = 0;
    let totalShots = 0;
    let kills = 0;
    let deaths = 0;
    let assists = 0;
    let damageIn = 0;
    let damageOut = 0;

    const agents: any = [];
    const maps: any = [];
    let count = 0;
    data.data.map((match: any) => {
      kills += match.stats.kills;
      deaths += match.stats.deaths;
      assists += match.stats.assists;
      damageOut += match.stats.damage.made;
      damageIn += match.stats.damage.received;
      headshots += match.stats.shots.head;
      totalShots +=
        match.stats.shots.head + match.stats.shots.leg + match.stats.shots.body;

      const won =
        match.stats.team === 'Blue' && match.teams.blue > match.teams.red
          ? true
          : match.stats.team === 'Red' && match.teams.red > match.teams.blue
          ? true
          : false;
      agents.push({ agent: match.stats.character.name, won: won });
      maps.push({ mapName: match.meta.map.name, won: won });
      count++;
    });

    const currentLevel = data.data[0].stats.level;
    const currentRank = data.data[0].stats.tier;
    const damageGame = damageOut / count;
    const killDeath = kills / deaths;
    const headhit = headshots / totalShots;

    let maxcount = 0;
    let agent_having_max_freq;
    for (let i = 0; i < agents.length(); i++) {
      let count = 0;
      for (let j = 0; j < agents.length(); j++) {
        if (agents[i] == agents[j]) {
          count++;
        }

        if (count > maxcount) {
          maxcount = count;
          agent_having_max_freq = agents[i];
        }
      }
    }
    const favoriteAgent = agent_having_max_freq;

    const stats = await db.valorantStats.create({
      data: {
        favoriteAgent,
        headhit,
        kills,
        deaths,
        assists,
        currentRank,
        currentLevel,
        killDeath,
        damageGame,
        valorantProfileId: profileId,
      },
    });
    console.log(stats);

    return NextResponse.json(stats);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
