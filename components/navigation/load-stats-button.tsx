"use client";

import { RefreshCcw } from "lucide-react"
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface LoadStatsButtonProps {
  profileId: string,
  puuid: string,
  region: string
}

export const LoadStatsButton = ({
  profileId,
  puuid,
  region
}: LoadStatsButtonProps) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onUpdate = async () => { 
      setIsLoading(true);
      try {
        await axios.post('/api/matches', {
          profileId,
          puuid,
          region
        });

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 2000);
      }
    } 

    setInterval(() => {
      const [currentMinutes, currentSeconds] = [new Date().getMinutes(), new Date().getSeconds()];

      if (currentMinutes % 15 > 0) {
        
        if (currentSeconds === 0 && currentMinutes - 1 !== 0) {
          setMinutes(Math.abs(currentMinutes % 15 - 15) + 1);
        } else {
          setMinutes(Math.abs(currentMinutes % 15 - 15))
        }
      } else {
        setMinutes(0);
      }

      if (currentSeconds > 0) { 
        setSeconds(Math.abs(currentSeconds - 60));
      } else if (currentMinutes === 0){
        setSeconds(60);
      } else {
        setSeconds(0);
      }

      if (currentMinutes === 0 && currentSeconds === 59) { 
        onUpdate();
      }
    }, 1000)
  }, [profileId, puuid, region]);
  
  const onSubmit = async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/matches', {
        profileId,
        puuid,
        region
      });

      router.refresh();
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setUpdated(true);
      setTimeout(() => {
        setUpdated(false);
      }, 2000);
    }
  }

  

  return (
    <button
      onClick={onSubmit}
      disabled={isLoading}
      className={cn(
        "text-black text-sm group w-[200px] h-[30px] flex flex-row justify-center transition-all bg-[#FB5454] rounded-md items-center outline outline-2 outline-neutral-700",
        isLoading && "bg-neutral-700 cursor-not-allowed",
        updated && "bg-[#7AE582] cursor-not-allowed",
        !isLoading && !updated && "hover:text-[#FB5454] hover:outline-[#FB5454] hover:outline-1 hover:bg-neutral-700"
      )}
    >
      <div
        className={cn(
          "absolute transition-all bottom-0 rounded-t-full bg-white h-[4px] w-[8px]",
          isLoading && "w-[30px] bg-[#FB5454]",
          updated && "w-[30px] bg-[#7AE582]",
          !isLoading && !updated && "group-hover:w-[30px] group-hover:bg-[#FB5454]"
        )}
      />
      {isLoading ? 
        <div className="opacity-80 fixed">
          Updating...
        </div>
        :
        updated ?
          <div className="opacity-80 fixed">
            Updated!
          </div>
        :
        <div className="justify-center flex items-center">
          <div className="visible group-hover:invisible fixed mr-6">
            Update in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <div className="font-bold invisible group-hover:visible fixed">
            Update Now
          </div>
          <RefreshCcw
            className="group-hover:text-[#FB5454] ml-[140px] transition-all"
            size={18}
          />
        </div>
      }
    </button>
  )
}