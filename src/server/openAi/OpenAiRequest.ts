import omit from 'lodash/omit';

import { OpenAiClient } from '@/server/openAi/OpenAiClient';
import { ServerException } from '@/server/utils/exceptions/ServerException';

export interface OpenAiRequestResponseFormat {
  json_schema: {
    name: string;
    description?: string;
    schema?: Record<string, unknown>;
    strict?: boolean | null;
  };
  type: 'json_schema';
}

interface Gpt4oMiniRequestOptions {
  content: string;
  systemContent?: string;
  responseFormat?: OpenAiRequestResponseFormat;
}

export class OpenAiRequest {
  static _requestWrapper<T>({ cb }: { cb: () => T }): T {
    try {
      return cb();
    } catch (error) {
      const cause = {
        type: 'OpenAiApiBackendRequest',
        data: omit(error as Error, ['headers']),
      };
      throw new ServerException((error as Error)?.message, cause);
    }
  }

  static async gpt4oMiniRequest({
    content,
    systemContent,
    responseFormat,
  }: Gpt4oMiniRequestOptions) {
    const response = await this._requestWrapper({
      cb: () =>
        OpenAiClient.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: systemContent || 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: content,
            },
          ],
          response_format: responseFormat,
        }),
    });

    return response;
  }
  static async gpt4oRequest({
    content,
    systemContent,
    responseFormat,
  }: Gpt4oMiniRequestOptions) {
    const response = await this._requestWrapper({
      cb: () =>
        OpenAiClient.chat.completions.create({
          model: 'gpt-4o-2024-08-06',
          messages: [
            {
              role: 'system',
              content: systemContent || 'You are a helpful assistant.',
            },
            {
              role: 'user',
              content: content,
            },
          ],
          response_format: responseFormat,
        }),
    });

    return response;
  }
}
