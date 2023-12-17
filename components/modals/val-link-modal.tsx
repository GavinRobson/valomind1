"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "Invalid username."
  }),
  tag: z.string().min(3, {
    message: "Invalid tag."
  }),
  region: z.string().min(2, {
    message: "Invalid region."
  }).max(5, {
    message: "Invalid region."
  })
});

export const ValorantLinkModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      tag: "",
      region: "",
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/riot', values);

      form.reset();
      router.refresh();
      window.location.reload();

    } catch (error: any) {
      console.log(error);
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <Image
          src='/images/valorant-logo.png'
          alt="Logo"
          width={100}
          height={100}
          className="mt-5 mx-auto"
        />
        <DialogHeader className="pt-2 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Link your Valorant account
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="space-y-3 px-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Enter your Valorant username
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          className="pt-5 bg-zinc-300/50 border-0 transition-all focus-visible:bg-white focus-visible:ring-0 text-black peer"
                          placeholder=" "
                          id="username"
                          label="Username"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tag"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Enter your Valorant tag
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          className="pt-5 bg-zinc-300/50 border-0 transition-all focus-visible:bg-white focus-visible:ring-0 text-black peer"
                          placeholder=" "
                          id="tag"
                          label="Tag"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
                    >
                      Enter your Valorant region
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isLoading}
                          className="pt-5 bg-zinc-300/50 border-0 transition-all focus-visible:bg-white focus-visible:ring-0 text-black peer"
                          placeholder=" "
                          id="region"
                          label="Region"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button className="text-zinc-500 outline-zinc-500" variant="primary" disabled={isLoading}>
                Link
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

