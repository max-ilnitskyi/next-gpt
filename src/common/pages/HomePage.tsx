'use client';
import React from 'react';

import { CreateMessageCard } from '@/main/message/components/cards/CreateMessageCard';

import { strings } from '@/texts';

export function HomePage() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="m-auto flex flex-col px-8 pt-8 pb-40 w-full max-w-[500px]">
        <h1 className="text-4xl font-bold mb-4 text-center">Analyze Message</h1>
        <p className="text-gray-400 mb-8 text-center">
          {strings.aiPoweredToolForMonitoringEmotionalTone}
        </p>

        <CreateMessageCard />
      </div>
    </div>
  );
}
