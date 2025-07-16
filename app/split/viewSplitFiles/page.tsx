'use client';

import React from 'react';
import { inter, lora } from '@/lib/fonts';

const SplitViewPage = () => {
  return (
    <section className="w-full max-w-3xl mx-auto p-6 border border-gray-200 rounded-md">
      <h1 className={`${inter.className} text-2xl font-bold mb-2 text-gray-800`}>
        View Split Files
      </h1>
      <p className={`${lora.className} text-muted-foreground mb-4`}>
        Here you can view and manage your split files.
      </p>

      {/* You can load actual split data here from an API or state */}
      <div className="text-sm text-gray-500 italic">
        No split file data connected yet.
      </div>
    </section>
  );
};

export default SplitViewPage;
