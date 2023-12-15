import { db } from './db';

export async function getProfiles() {
  const profiles = await db.profile.findMany({
    select: {
      id: true,
      valorantProfile: true,
    },
  });

  return profiles;
}
