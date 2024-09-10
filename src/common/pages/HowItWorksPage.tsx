'use client';
import React from 'react';

import { externalLinks } from '@/main/howItWorks/howItWorksConstants';
import { strings, pages } from '@/texts';

export function HowItWorksPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">{pages.howItWorks.shortName}</h1>
      <p className="text-gray-400 mb-8 leading-5">
        {strings.howItWorks.ourAIPoweredToolHelps}
      </p>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {strings.howItWorks.step1Title}
        </h2>
        <p className="text-gray-300 mb-4 pl-2 leading-5">
          {strings.howItWorks.step1Text}
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          {strings.howItWorks.step2Title}
        </h2>
        <p className="text-gray-300 mb-4 pl-2 leading-5">
          {strings.howItWorks.step2Text}
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          {strings.howItWorks.step3Title}
        </h2>
        <p className="text-gray-300 mb-4 pl-2 leading-5">
          {strings.howItWorks.step3Text}
        </p>

        <h2 className="text-2xl font-semibold mb-2">
          {strings.howItWorks.step4Title}
        </h2>
        <p className="text-gray-300 mb-4 pl-2 leading-5">
          {strings.howItWorks.step4Text}
        </p>

        {/* External resource link */}
        <p className="text-gray-400 mt-6 leading-5">
          {strings.howItWorks.forMoreDetailedInformationOn}{' '}
          <a
            href={externalLinks.theeMotionMachineValenceArousal}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 font-semibold hover:underline"
          >
            {strings.howItWorks.thisResource}
          </a>
        </p>
      </div>
    </>
  );
}
