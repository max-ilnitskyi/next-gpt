'use client';
import React from 'react';

import { pages } from '@/texts';

export function MyMessagesPage() {
  return (
    <div className="h-full w-full max-w-xl p-8">
      <h1 className="text-4xl font-bold mb-4">{pages.myMessages.shortName}</h1>
      {/* temp */}
      <p className="text-center">Will come later</p>
    </div>
  );
}
