export class BaseException extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public cause?: unknown,
    public fullMessages?: string[],
  ) {
    super(message, { cause });
  }
}
