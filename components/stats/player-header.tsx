import Image from 'next/image';
import { rankData } from '@/rankData.json';

interface PlayerHeaderProps {
  headerImg: any;
  data: { card: string; rank: number; borderImg: string; levelImg: string };
}

export const PlayerHeader = ({ headerImg, data }: PlayerHeaderProps) => {
  const color0 = `#${headerImg.data.backgroundGradientColors[0].substring(
    0,
    6
  )}`;
  const color1 = `#${headerImg.data.backgroundGradientColors[1].substring(
    0,
    6
  )}`;
  const color2 = `#${headerImg.data.backgroundGradientColors[2].substring(
    0,
    6
  )}`;
  const color3 = `#${headerImg.data.backgroundGradientColors[3].substring(
    0,
    6
  )}`;

  const gradient = `radial-gradient(circle, ${color0}, ${color1}, ${color3}, ${color2})`;
  console.log(color0, color1, color2, color3);

  let rankImg = rankData.find((rank) => rank.tier === data.rank)?.largeIcon;
  if (!rankImg) {
    rankImg =
      'https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/0/largeicon.png';
  }

  return (
    <div className="flex items-center w-screen h-[250px]">
      <div
        style={{ background: gradient }}
        className="flex flex-row flex-1 items-center justify-center h-[250px] w-screen space-x-20 overflow-hidden"
      >
        <Image src={rankImg} alt="Rank" height={150} width={150} className="" />
        <Image
          src={headerImg.data.background}
          alt="background"
          height={1000}
          width={500}
          className="rotate-90 overflow-hidden p-4"
        />
      </div>
    </div>
  );
};
