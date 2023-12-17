import { ValorantStatsPage } from '@/components/stats/valorant-stats-page';
import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';

const StatsPage = async ({ params }: { params: { accountId: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const valorantMatches: any = await db.match.findMany({
    where: {
      valorantProfileId: params.accountId,
      mode: 'competitive',
    },
    orderBy: {
      matchDate: 'desc',
    },
  });

  if (!valorantMatches) {
    return (
      <div className="absolute h-full w-full flex justify-center">
        No matches played!
      </div>
    );
  }

  const puuid = valorantMatches[0].overview.stats.puuid;
  const region = valorantMatches[0].overview.meta.region;

  const response = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/by-puuid/account/${puuid}`
  );

  const response1 = await fetch(
    `https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/${region}/${puuid}`
  );

  const rankData = await response1.json();

  const valorantProfile = await response.json();

  const stats: any = [];
  const characterCounts: { [seasonId: string]: { [characterId: string]: number } } = {};

  let current = 0;
  valorantMatches.map((match: any, i: number) => {
    if (!characterCounts[match.overview.meta.season.id]) {
      characterCounts[match.overview.meta.season.id] = {};
    }
    if (i === 0) {
      stats.push({
        season: match.overview.meta.season.id,
        seasonShort: match.overview.meta.season.short,
        kills: match.overview.stats.kills,
        deaths: match.overview.stats.deaths,
        assists: match.overview.stats.assists,
        damageOut: match.overview.stats.damage.made,
        damageIn: match.overview.stats.damage.received,
        headshots: match.overview.stats.shots.head,
        totalshots:
          match.overview.stats.shots.head +
          match.overview.stats.shots.body +
          match.overview.stats.shots.leg,
        maps: [
          {
            map: match.overview.meta.map.name,
            won: match.won,
            character: { id: match.overview.stats.character.id, name: match.overview.stats.character.name },
            kills: match.overview.stats.kills,
            deaths: match.overview.stats.deaths,
            assists: match.overview.stats.assists,
            damageOut: match.overview.stats.damage.made,
            damageIn: match.overview.stats.damage.received,
            headshots: match.overview.stats.shots.head,
            totalshots: match.overview.stats.shots.head + match.overview.stats.shots.body + match.overview.stats.shots.leg,
          },
        ],
      });
    } else if (match.overview.meta.season.id !== stats[current].season) {
      stats.push({
        season: match.overview.meta.season.id,
        seasonShort: match.overview.meta.season.short,
        kills: match.overview.stats.kills,
        deaths: match.overview.stats.deaths,
        assists: match.overview.stats.assists,
        damageOut: match.overview.stats.damage.made,
        damageIn: match.overview.stats.damage.received,
        headshots: match.overview.stats.shots.head,
        totalshots:
          match.overview.stats.shots.head +
          match.overview.stats.shots.body +
          match.overview.stats.shots.leg,
        maps: [
          {
            map: match.overview.meta.map.name,
            won: match.won,
            character: { id: match.overview.stats.character.id, name: match.overview.stats.character.name },
            kills: match.overview.stats.kills,
            deaths: match.overview.stats.deaths,
            assists: match.overview.stats.assists,
            damageOut: match.overview.stats.damage.made,
            damageIn: match.overview.stats.damage.received,
            headshots: match.overview.stats.shots.head,
            totalshots: match.overview.stats.shots.head + match.overview.stats.shots.body + match.overview.stats.shots.leg,
          },
        ],
        mostPlayedCharacter: { name: null, id: null },
      });
      current++;
    } else {
      stats[current].kills += match.overview.stats.kills;
      stats[current].deaths += match.overview.stats.deaths;
      stats[current].assists += match.overview.stats.assists;
      stats[current].damageOut += match.overview.stats.damage.made;
      stats[current].damageIn += match.overview.stats.damage.received;
      stats[current].headshots += match.overview.stats.shots.head;
      stats[current].totalshots +=
        match.overview.stats.shots.head +
        match.overview.stats.shots.body +
        match.overview.stats.shots.leg;
      stats[current].maps.push({
        map: match.overview.meta.map.name,
        won: match.won,
        character: { id: match.overview.stats.character.id, name: match.overview.stats.character.name },
        kills: match.overview.stats.kills,
        deaths: match.overview.stats.deaths,
        assists: match.overview.stats.assists,
        damageOut: match.overview.stats.damage.made,
        damageIn: match.overview.stats.damage.received,
        headshots: match.overview.stats.shots.head,
        totalshots: match.overview.stats.shots.head + match.overview.stats.shots.body + match.overview.stats.shots.leg,
      });
    }

    if (!characterCounts[match.overview.meta.season.id][match.overview.stats.character.id]) {
      characterCounts[match.overview.meta.season.id][match.overview.stats.character.id] = 1;
    } else {
      characterCounts[match.overview.meta.season.id][match.overview.stats.character.id]++;
    }
  });

  for (const seasonId in characterCounts) {
    const characters = characterCounts[seasonId];
    const mostPlayedCharacterId = Object.keys(characters).reduce((a, b) => characters[a] > characters[b] ? a : b);

    // Add most played character information to stats
    const seasonIndex = stats.findIndex((s: any) => s.season === seasonId);
    stats[seasonIndex].mostPlayedCharacter = { id: mostPlayedCharacterId, name: null }; // Replace 'name' with the actual name if available
  }
  console.log(stats[0])

  stats.push({ rank: rankData.data.currenttier });

  return (
    <div className="w-full h-full">
      <ValorantStatsPage
        data={stats}
        userData={valorantProfile}
        params={params}
      />
    </div>
  );
};

export default StatsPage;
