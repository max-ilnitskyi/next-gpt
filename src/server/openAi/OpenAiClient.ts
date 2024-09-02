import OpenAI from 'openai';

export const OpenAiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
