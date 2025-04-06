
import React from 'react'
import {
  FileTextIcon,
  GlobeIcon,
  InputIcon,
  MagicWandIcon,
} from "@radix-ui/react-icons";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { Divider } from './divider';
import { BarChartIcon } from 'lucide-react';

const features = [
  {
    Icon: FileTextIcon,
    name: "Transcibe your podcast",
    description: "We automatically transcibe your podcasts.",
    href: "/",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Chapters with timestamps",
    description: "Create chapters with timestamps for clearer descriptions.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual",
    description: "Supports 100+ languages and counting.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: MagicWandIcon,
    name: "Automated episode descriptions",
    description: "Generate episode descriptions with a single click, based on the content of the episode.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BarChartIcon,
    name: "Social media promotion",
    description:
      "Create social media posts for your episodes, with a single click.",
    href: "/",
    cta: "Learn more",
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export const Feature = () => {
  return (
    <div className="container mx-auto mt-8 w-4/5">
      <Divider />
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
      <Divider />
    </div>
  )
}
