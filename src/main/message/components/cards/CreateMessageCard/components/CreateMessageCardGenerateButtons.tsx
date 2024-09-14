import React from 'react';

import { MessageValenceClassification } from '@/main/message/messageTypes';

import { BaseTooltipHelper } from '@/helpers/tooltips/BaseTooltipHelper';
import { BaseButtonHelper } from '@/helpers/buttons/BaseButtonHelper';
import { ValenceIcon } from '@/main/message/components/ValenceIcon';

import { strings } from '@/texts';

interface CreateMessageCardGenerateButtonsProps {
  isPending: boolean;
  onNeutral: () => void;
  onPositive: () => void;
  onNegative: () => void;
}

export function CreateMessageCardGenerateButtons({
  isPending,
  onNeutral,
  onPositive,
  onNegative,
}: CreateMessageCardGenerateButtonsProps) {
  return (
    <div className="w-full flex justify-center sm:justify-between sm:px-20">
      <BaseTooltipHelper
        contentClassName="z-10 max-w-md p-2 bg-gray-200 text-gray-900 rounded-lg overflow-hidden drop-shadow-xl"
        content={strings.generateNegativeMessage}
      >
        <BaseButtonHelper
          className="rounded-full p-1.5 hover:bg-blue-100"
          onClick={onNegative}
          disabled={isPending}
        >
          <ValenceIcon
            addClassName="size-10"
            valenceClassification={MessageValenceClassification.STRONG_NEGATIVE}
          />
        </BaseButtonHelper>
      </BaseTooltipHelper>

      <BaseTooltipHelper
        contentClassName="z-10 max-w-md p-2 bg-gray-200 text-gray-900 rounded-lg overflow-hidden drop-shadow-xl"
        content={strings.generateNeutralMessage}
      >
        <BaseButtonHelper
          className="rounded-full p-1.5 hover:bg-blue-100"
          onClick={onNeutral}
          disabled={isPending}
        >
          <ValenceIcon
            addClassName="size-10"
            valenceClassification={MessageValenceClassification.NEUTRAL}
          />
        </BaseButtonHelper>
      </BaseTooltipHelper>

      <BaseTooltipHelper
        contentClassName="z-10 max-w-md p-2 bg-gray-200 text-gray-900 rounded-lg overflow-hidden drop-shadow-xl"
        content={strings.generatePositiveMessage}
      >
        <BaseButtonHelper
          className="rounded-full p-1.5 hover:bg-blue-100"
          onClick={onPositive}
          disabled={isPending}
        >
          <ValenceIcon
            addClassName="size-10"
            valenceClassification={MessageValenceClassification.STRONG_POSITIVE}
          />
        </BaseButtonHelper>
      </BaseTooltipHelper>
    </div>
  );
}
