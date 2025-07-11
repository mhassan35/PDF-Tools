'use client'
import { lora, roboto } from '@/lib/fonts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const footerBtns = [
  { name: "Merge PDF", href: "/merge" },
  { name: "Split PDF", href: "/split" },
  { name: "Convert Files", href: "/conversions" },
];

const Footer = () => {
  const footerPath = usePathname();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 p-6">
      <div className="max-w-screen-xl mx-auto px-4 flex flex-col sm:flex-row items-center sm:items-start justify-between">        
          <Link href='/' className={` ${lora.className}text-xl font-bold text-gray-800`}>PDF Tools</Link>
        
        <div className="text-center mt-4 sm:text-left sm:self-end">
          <p className={` ${roboto.className} text-md font-medium text-gray-700`}>&copy; 2024 Your Company. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          {footerBtns.map((item) => {
            const isActive = footerPath.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-md ${roboto.className} text-gray-700 hover:text-black ${isActive ? null: null}`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
