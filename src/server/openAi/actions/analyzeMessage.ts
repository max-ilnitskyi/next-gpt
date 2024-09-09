import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
import first from 'lodash/first';

import { OpenAiRequest } from '@/server/openAi/OpenAiRequest';

const systemContent = `
Please analyze the following text and evaluate it on two scales: Valence and Arousal.
Valence reflects the degree of positivity or negativity of the emotion (ranging from -100 to 100),
and Arousal represents the intensity or energy level of the emotion (ranging from 0 to 100).
Return the result in JSON format, with Valence and Arousal as numeric values.
`;

const responseFormat = zodResponseFormat(
  z.object({
    valence: z.number({
      description:
        'reflects the degree of positivity or negativity of the emotion (ranging from -100 to 100)',
    }),
    arousal: z.number({
      description:
        'represents the intensity or energy level of the emotion (ranging from 0 to 100)',
    }),
  }),
  'analyzeMessage',
);

export async function analyzeMessage(message: string) {
  const response = await OpenAiRequest.gpt4oRequest({
    content: message,
    systemContent,
    responseFormat,
  });

  const parsedResponse = JSON.parse(
    first(response.choices)?.message?.content as string,
  );
  const valence = parsedResponse?.valence / 100;
  const arousal = parsedResponse?.arousal / 100;

  return { valence, arousal };
}
