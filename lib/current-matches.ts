import { db } from "./db";

export const currentMatches = async ({
  params,
  mode,
}: {
  params: { accountId: string },
  mode?: string
}) => {
  const userId = params;

  if (!userId) {
    return null;
  }

  var matches = null;

  mode ?
    matches = await db.match.findMany({
      where: {
        valorantProfile: {
          profileId: userId.accountId
        },
        mode
      }
    }) :
    matches = await db.match.findMany({
      where: {
        valorantProfile: {
          profileId: userId.accountId
        }
      }
    });
    
  return matches;
}