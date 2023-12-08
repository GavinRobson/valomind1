"use client";

import { createQueryString } from "@/hooks/create-query-params";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface MatchModeNavigationProps {
  id: string;
  label: string;
}

export const MatchModeNavigation = ({
  id,
  label,
}: MatchModeNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const modeParams = useSearchParams();

  const onClick = () => {
    const pathnameSplit = pathname.split("/");
    const newPathname = `/${pathnameSplit[1]}/${pathnameSplit[2]}/${pathnameSplit[3]}`;
    router.push(`${newPathname}?${createQueryString(
      'mode',
      id,
      modeParams
    )}`);
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "text-primary transition-all hover:text-[#FB5454] hover:font-semibold",
        modeParams.get('mode') === id && "text-[#FB5454]"
      )}>
      {label}
    </button>
  )
}