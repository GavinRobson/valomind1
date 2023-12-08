import Image from "next/image";
import { GameSwap } from "./game-swap";

export const GameSwapHeaderItem = () => {
  return (
    <div className="flex flex-row w-full pr-4 space-x-5">
      <GameSwap
        path = "valorant"
      />
      <GameSwap
        path = "lol"
      />
    </div>
  )
}