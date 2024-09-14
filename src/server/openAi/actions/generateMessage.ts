import first from 'lodash/first';
import sample from 'lodash/sample';

import { OpenAiRequest } from '@/server/openAi/OpenAiRequest';

import { mockProducts } from './generateMessage.constants';

const systemContent = `
You are an advanced assistant specialized in generating text.
`;
function getContent({
  valence,
  arousal,
  product,
}: {
  valence: number;
  arousal: number;
  product: string;
}) {
  return `
You are an assistant specialized in creating fake customer reviews. You need to generate a review for the product "${product}".

The emotional tone of the review should correspond to the following parameters:
- Valence: ${valence} # Range: -1 (negative) to 1 (positive)
- Arousal: ${arousal} # Range: 0 (calm) to 1 (high activation)

Valence reflects the degree of positivity or negativity of the emotion
and Arousal represents the intensity or energy level of the emotion

The review should be between 20 and 50 words long.

Please write a realistic and convincing review from the perspective of a fictional customer, mentioning the selected product and reflecting the specified emotional tone.
`;
}

export async function generateMessage({
  valence,
  arousal,
}: {
  valence: number;
  arousal: number;
}) {
  const product = sample(mockProducts);

  const response = await OpenAiRequest.gpt4oRequest({
    content: getContent({ valence, arousal, product }),
    systemContent,
  });

  return first(response.choices)?.message?.content as string;
}
