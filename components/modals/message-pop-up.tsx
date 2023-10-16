"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import axios from "axios";

interface MessagePopUpProps {
  message: string,
  action: string,
  description?: string,
  accountId: string
}

export const MessagePopUp = ({
  message,
  action,
  description,
  accountId,
}: MessagePopUpProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUnlink = async () => {
    setIsLoading(true);
    try {
      await axios.delete('/api/riot', {
        data: {
          accountId
        }
      });

      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const onHome = () => {
    router.push("/");
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 h-min-[200px] overflow-hidden">
        <DialogHeader className="pb-4 pt-4 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {message}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            {description}
          </DialogDescription>
          <div className="space-y-4 pt-4 flex flex-col items-center justify-center">
            <Button size="lg" variant="primary" onClick={onUnlink} disabled={isLoading}>
              {action}
            </Button>
            <Button variant="primary" size="lg" onClick={onHome} disabled={isLoading}>
              Home
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}