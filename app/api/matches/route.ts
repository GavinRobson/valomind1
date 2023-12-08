import { currentProfile } from "@/lib/current-profile";
import { currentValorant } from "@/lib/current-valorant";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { profileId, puuid, region } = await req.json();
    const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/${region}/${puuid}`);
    const matchJson = await response.json();

    if (matchJson.errors) {
      return new NextResponse(`${matchJson.errors.message}`, { status: matchJson.status });
    }

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const valorant = await currentValorant(profile.id);

    console.log(valorant);
    console.log(profile);

    if (!valorant) {
      return null;
    }

    const data = [];

    for (var i = 0; i < matchJson.data.length; i++) {
      // if (matchJson.data[i].meta.season.short != "e7a2") {
      //   break;
      // }

      const existingMatch = await db.match.findFirst({
        where: {
          matchId: matchJson.data[i].meta.id,
          valorantProfileId: profileId,
        }
      });

      if (existingMatch) {
        break;
      }

      const won =
        matchJson.data[i].stats.team === 'Blue' && matchJson.data[i].teams.blue > matchJson.data[i].teams.red ? true :
          matchJson.data[i].stats.team === 'Red' && matchJson.data[i].teams.red > matchJson.data[i].teams.blue ? true :
            matchJson.data[i].teams.red === matchJson.data[i].teams.blue ? null : false;
  
      
      data.push({
        matchId: matchJson.data[i].meta.id,
        mode: matchJson.data[i].meta.mode,
        matchDate: matchJson.data[i].meta.started_at,
        red_rounds: matchJson.data[i].teams.red,
        blue_rounds: matchJson.data[i].teams.blue,
        player_team: matchJson.data[i].stats.team,
        won: won,
        act: matchJson.data[i].meta.season.short,
        overview: matchJson.data[i],
        valorantProfileId: profileId,
      });
    }

    console.log(data);

    const matches = await db.match.createMany({
      data,
      skipDuplicates: true
    });

    console.log(matches);

    return NextResponse.json(matches);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}