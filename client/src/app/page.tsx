import { HeroGeometric } from "@/components/ui/shape-landing-hero";

import { Metadata } from 'next';
import { FooterSection } from "@/components/footer";
import { Feature } from "@/components/feature";
import { GetStartedBanner } from "@/components/getstartedbanner";
import { COMPANY_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Home | ${COMPANY_NAME}`,
  description: "Automate Your Podcast Production & Promotion Effortlessly launch and grow your audio or video podcast with everything you need in one place, with the help of AI. Simply upload your podcast and generate personalized high-quality content —all with a single click.",
};

export default function Home() {
  return (
    <div>
      <HeroGeometric />
      <Feature />
      <GetStartedBanner />
      <FooterSection />
    </div>
  );
}
