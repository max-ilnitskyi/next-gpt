import { NextResponse } from 'next/server';

import { BaseException } from './BaseException';
import { NotFoundException } from './NotFoundException';
import { ServerException } from './ServerException';
import { AuthorizationException } from './AuthorizationException';

function prepareErrorResponse<T extends BaseException>(error: T) {
  return {
    ...(error || {}),
    message: error?.message,
    stack: error?.stack,
    cause: error?.cause,
    fullMessages: error?.fullMessages,
  };
}

export function processError<T extends BaseException>({
  error,
}: {
  error: T | Error;
}) {
  if ((error as NotFoundException)?.statusCode === 404) {
    return NextResponse.json(
      {
        success: false,
        error: prepareErrorResponse(error as NotFoundException),
      },
      { status: 404 },
    );
  }

  if ((error as AuthorizationException)?.statusCode === 401) {
    return NextResponse.json(
      {
        success: false,
        error: prepareErrorResponse(error as AuthorizationException),
      },
      { status: 401 },
    );
  }

  if ((error as ServerException)?.statusCode === 500) {
    return NextResponse.json(
      {
        success: false,
        error: prepareErrorResponse(error as ServerException),
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: false,
      error: prepareErrorResponse(error as ServerException),
    },
    { status: 500 },
  );
}
