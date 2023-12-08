import { db } from "@/lib/db";

export const currentValorant = async (
  profileId: string
) => {

  const valorant = await db.valorantProfile.findUnique({
    where: {
      profileId
    }
  })

  return valorant;
}