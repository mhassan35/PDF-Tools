"use client"
import { lora, roboto } from '@/lib/fonts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FiGithub } from "react-icons/fi";

const navigationItems = [
  { name: "Merge PDF", href: "/merge" },
  { name: "Split PDF", href: "/split" },
  { name: "Convert Files", href: "/conversions" },
];
export default function NavigationBar() {
const path = usePathname()
  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between">
        <Link href="/" className={`${lora.className} text-xl font-bold text-gray-800`}>
          PDF Tools
        </Link>
        <div className="hidden md:flex space-x-6 font-medium text-gray-700">
          {navigationItems.map((item) => {
            const active = path.startsWith(item.href)
           return (
              <Link key={item.name} href={item.href} className={`${roboto.className} 
              ${active ? "" : ""} 
              text-md text-gray-600 hover:text-gray-900 transition-colors duration-200`}>
                {item.name}
              </Link>
            )})}
        </div>
        <Link href="/" className={`${roboto.className} flex items-center gap-2 text-md text-gray-600 hover:text-gray-900 transition-colors duration-200`}>
          <FiGithub className="text-lg" />
          View GitHub
        </Link>
      </div>
    </nav>
  );
}
