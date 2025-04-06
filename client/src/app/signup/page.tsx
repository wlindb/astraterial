import React from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Metadata } from "next";
import { COMPANY_NAME } from "@/lib/constants";
import { GetStartedForm } from "./getstartedform";

export const metadata: Metadata = {
  title: `Get Started | ${COMPANY_NAME}`,
  description: "Join the waitlist",
};

export default function SignUp() {
  return (
    <div className="container w-full mx-auto h-screen md:mt-16">
      <div className="h-[40rem] w-full rounded-md bg-background relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4 z-10">
          <h1 className="relative z-10 text-4xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold">
            Join the Waitlist
          </h1>
          <h2 className="relative z-10 text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground text-center font-sans font-bold my-4">
            Supercharge Your Podcast Content!
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto my-8 text-md text-center relative z-10">
            Are you a podcast producer looking to maximize your content&apos;s potential? At {COMPANY_NAME}, we&apos;re about to launch a game-changing tool designed to help you repurpose your podcast episodes into engaging content for every platform—effortlessly.
            By signing up, you&apos;ll be among the first to experience {COMPANY_NAME}&apos;s suite of powerful features:
          </p>
          <GetStartedForm />
        </div>
        <BackgroundBeams />
      </div>
    </div>
  )
}
