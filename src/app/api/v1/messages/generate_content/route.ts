import { NextRequest, NextResponse } from 'next/server';
import keys from 'lodash/keys';
import includes from 'lodash/includes';
import range from 'lodash/range';
import minBy from 'lodash/minBy';

import { processError } from '@/server/utils/exceptions/processError';
import { analyzeMessage } from '@/server/openAi/actions/analyzeMessage';
import { generateMessage } from '@/server/openAi/actions/generateMessage';
import { ServerException } from '@/server/utils/exceptions/ServerException';

const scope = 'generateMessageContent';

const valenceArousalByType = {
  negative: {
    valence: -1,
    arousal: 1,
  },
  positive: {
    valence: 1,
    arousal: 1,
  },
  neutral: {
    valence: 0,
    arousal: 0,
  },
} as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const type: keyof typeof valenceArousalByType = body?.type;

    if (!type) {
      throw new ServerException('type field is required');
    }

    if (!includes(keys(valenceArousalByType), type)) {
      throw new ServerException(`Unsupported type: ${type}`);
    }

    const valenceArousal = valenceArousalByType[type];

    const generateRequests = range(3).map(() =>
      generateMessage(valenceArousal),
    );

    const generateResponses = await Promise.all(generateRequests);

    const analyzeRequests = generateResponses.map((generateResponse) =>
      analyzeMessage(generateResponse),
    );

    const analyzeResponses = await Promise.all(analyzeRequests);

    const generateResponseIndex = minBy(
      range(generateRequests.length),
      (index) => {
        const currentValenceArousal = analyzeResponses[index];
        return Math.abs(valenceArousal.valence - currentValenceArousal.valence);
      },
    ) as number;

    const content = generateResponses[generateResponseIndex];

    if (!content) {
      throw new ServerException();
    }

    return NextResponse.json({
      success: true,
      [scope]: { content },
    });
  } catch (error) {
    return processError({ error: error as Error });
  }
}
