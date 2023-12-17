import { NextResponse } from "next/server"
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { username, tag, region } = await req.json();
    const response = await fetch(`https://api.henrikdev.xyz/valorant/v1/account/${username}/${tag}`);
    const data = await response.json();

    if (data.errors) {
      return new NextResponse(`${data.erros.message}`, { status: data.status });
    }

    const puuid = data.data.puuid;

    const existingValorantAccount = await db.valorantProfile.findFirst({
      where: {
        puuid
      }
    });

    if (existingValorantAccount) {
      console.error("This Valorant account is already linked to an account.");
      return null;
    }

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingRiot = await db.valorantProfile.findFirst({
      where: {
        profileId: profile.id
      }
    });

    if (existingRiot) {
      console.error("Profile already has Valorant linked");
      return null;
    }

    const valorantLink = await db.valorantProfile.create({
      data: {
        profileId: profile.id,
        username,
        tag,
        region,
        puuid,
      }
    });

    return NextResponse.json(valorantLink);
  } catch (error) {
    console.log("[RIOT_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { accountId } = await req.json();

    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const valorantDelete = await db.valorantProfile.delete({
      where: {
        id: accountId,
        profileId: profile.id,
      }
    });

    return NextResponse.json(valorantDelete);
  } catch (error) {
    console.log("[RIOT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}