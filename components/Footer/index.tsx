'use client';

import { lora, roboto } from '@/lib/fonts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { FiGithub } from 'react-icons/fi';

const footerBtns = [
  { name: "Merge PDF", href: "/merge" },
  { name: "Split PDF", href: "/split" },
  { name: "Convert Files", href: "/conversions" },
];

const Footer = () => {
  const footerPath = usePathname();

  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6">
        {/* Logo */}
        <Link href="/" className={`${lora.className} text-xl font-bold text-gray-800`}>
          PDF Tools
        </Link>
        {/* Copyright */}
        <div className="text-center sm:text-right">
          <p className={`${roboto.className} text-sm text-gray-600`}>
            &copy; 2024 Your Company. All rights reserved.
          </p>
        </div>
        {/* Footer Links */}
        <div className="flex justify-center sm:justify-start gap-6">
             <Link href="/" className={`${roboto.className} flex items-center gap-2 text-md text-gray-600 hover:text-gray-900 transition-colors duration-200`}>
          <FiGithub className="text-lg" />
          Get Code
        </Link>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
