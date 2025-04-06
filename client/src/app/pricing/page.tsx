import React from 'react'
import { Pricing } from "@/components/blocks/pricing";
import { Metadata } from 'next';
import { COMPANY_NAME } from '@/lib/constants';

const demoPlans = [
  {
    name: "STARTER",
    price: "18",
    yearlyPrice: "11",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/signup",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "39",
    yearlyPrice: "27",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/signup",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/signup",
    isPopular: false,
  },
];
export const metadata: Metadata = {
  title: `Pricing | ${COMPANY_NAME}`,
  description: "Choose the plan that works for you. All plans include access to our platform, lead generation tools, and dedicated support.",
};

export default function PricingPage() {
  return (
    <div>
      <div className="container w-4/5 md:w-full mx-auto">
        <Pricing
          plans={demoPlans}
          title="Simple, Transparent Pricing"
          description="Choose the plan that works for you. All plans include access to our platform, lead generation tools, and dedicated support."
        />
      </div>
    </div>
  )
}

