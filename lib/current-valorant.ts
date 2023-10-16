import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";

export const currentValorant = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId
    },
    include: {
      valorantProfile: true
    }
  });

  if (!profile) {
    return null;
  }

  const valorant = await db.valorantProfile.findUnique({
    where: {
      profileId: profile.id
    }
  });

  return valorant;
}