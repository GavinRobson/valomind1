"use client";

import { cn } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";

interface NavigationActionProps {
  id: string;
  label: string;
  accountId?: string;
}

export const NavigationAction = ({
  id,
  label,
  accountId,
}: NavigationActionProps) => {
  const router = useRouter();
  const current = usePathname();

  const onClick = () => {
    accountId ? router.push(`${id}/${accountId}`) : router.push(id);
  }
  return (
    <button 
      onClick={onClick}
      className="group relative h-full flex items-center justify-center px-2"
    >
        <div className={cn(
          "absolute bottom-0 bg-white rounded-t-full transition-all h-[4px]",
          current.includes(id.replace('/valorant', "")) && "group-hover:w-[20px]",
          current.includes(id.replace('/valorant', "")) ? "w-[40px] group-hover:w-[30px] bg-[#FB5454]" : "w-[8px]"
        )}/>
        <div className={cn(
          "text-primary transition-all rounded-lg group-hover:text-[#FB5454]"
        )}>
          {label}
        </div>
    </button>
  )
}