"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import LogoSvg from '@/app/assets/logo.svg';

export interface NavbarProps {
  companyName: string;
  links: {
    name: string;
    url: string;
  }[];
}

export const Navbar = ({ companyName, links }: NavbarProps) => {
  const path = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [path]);

  return (
    <>
      <nav className={clsx(
        "z-1000 border-b sticky top-0 bg-background md:bg-transparent backdrop-blur-md",
      )}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={LogoSvg} width={48} height={48} className="h-8" alt={`${companyName} Logo`} />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-foreground">{companyName}</span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href="/signup" >
              <Button variant={"default"} size="default">Get started</Button>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={clsx(
            "flex flex-col items-center justify-center invisible md:visible h-0",
          )} id="navbar-cta">
            <ul className="flex flex-col font-medium p-4 md:p-0 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
              <li>
                <Link href="/" className={clsx("block py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary", "/" === path ? "text-primary" : "text-foreground")} aria-current="page">
                  Home
                </Link>
              </li>
              {links.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className={clsx("block py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary", link.url === path ? "text-primary" : "text-foreground")}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
      <div className={clsx(
        "md:hidden z-1000 fixed w-full h-full bg-background flex flex-col items-center justify-around overflow-hidden transform transition-all duration-500 ease-in-out",
        isMenuOpen ? "translate-x-0 no-doc-scroll" : "translate-x-full",
      )}
        id="navbar-cta-mobile">
        <ul className="flex flex-col w-full font-bold text-lg text-center rtl:space-x-reverse">
          <li className="border-b pb-4 py-4">
            <Link href="/" className={clsx("block py-2 px-3 rounded-sm", "/" === path ? "text-primary" : "text-foreground")} aria-current="page">
              Home
            </Link>
          </li>
          {links.map((link) => (
            <li key={link.url} className="border-b py-4">
              <Link href={link.url} className={clsx("block py-2 px-3 mrounded-sm", link.url === path ? "text-primary" : "text-foreground")}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-full text-center mb-8">
          <Link href="/signup" >
            <Button variant={"default"} size="lg">Get started</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

