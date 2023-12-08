import Image from 'next/image';

interface PlayerIconProps {
  data: any;
  agent: string;
  color: string;
}

export const PlayerIcon = ({ data, agent, color }: PlayerIconProps) => {
  return (
    <div className="relative">
      <Image
        src={agent}
        alt="Agent"
        height={20}
        width={20}
        className="rounded-full"
      />
    </div>
  );
};
