-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL,
    "red_rounds" INTEGER,
    "blue_rounds" INTEGER,
    "player_team" TEXT,
    "won" BOOLEAN,
    "act" TEXT NOT NULL,
    "overview" JSONB NOT NULL,
    "valorantProfileId" TEXT NOT NULL,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValorantProfile" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "puuid" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValorantProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValorantStats" (
    "id" TEXT NOT NULL,
    "favoriteAgent" TEXT,
    "headhit" DOUBLE PRECISION,
    "favoriteWeapon" TEXT,
    "kills" INTEGER,
    "deaths" INTEGER,
    "assists" INTEGER,
    "currentRank" INTEGER,
    "currentLevel" INTEGER,
    "killDeath" DOUBLE PRECISION,
    "damageGame" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "valorantProfileId" TEXT NOT NULL,

    CONSTRAINT "ValorantStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapStats" (
    "id" TEXT NOT NULL,
    "mapName" TEXT,
    "winRate" INTEGER,
    "timesPlayed" INTEGER,
    "wins" INTEGER,
    "losses" INTEGER,
    "valorantStatsId" TEXT NOT NULL,

    CONSTRAINT "MapStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Match_valorantProfileId_idx" ON "Match"("valorantProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "ValorantProfile_profileId_key" ON "ValorantProfile"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "ValorantStats_valorantProfileId_key" ON "ValorantStats"("valorantProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "MapStats_valorantStatsId_key" ON "MapStats"("valorantStatsId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_valorantProfileId_fkey" FOREIGN KEY ("valorantProfileId") REFERENCES "ValorantProfile"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValorantProfile" ADD CONSTRAINT "ValorantProfile_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValorantStats" ADD CONSTRAINT "ValorantStats_valorantProfileId_fkey" FOREIGN KEY ("valorantProfileId") REFERENCES "ValorantProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MapStats" ADD CONSTRAINT "MapStats_valorantStatsId_fkey" FOREIGN KEY ("valorantStatsId") REFERENCES "ValorantStats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
