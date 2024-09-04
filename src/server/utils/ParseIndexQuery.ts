import { NextRequest } from 'next/server';
import parseInt from 'lodash/parseInt';

import { IndexQueryOptions } from '@/server/server.types';

export class ParseIndexQuery<
  FILTERS extends Record<string, unknown>,
  SORT extends string[],
> {
  searchParams: URLSearchParams;
  constructor(req: NextRequest) {
    this.searchParams = req?.nextUrl?.searchParams;
  }

  parse(): IndexQueryOptions<FILTERS, SORT> {
    return {
      limit: this.parseLimit(),
      page: this.parsePage(),
      filters: this.parseFilters(),
      sort: this.parseSort(),
    };
  }

  parseLimit(): number | undefined {
    return parseInt(this.searchParams.get('limit') as string) || undefined;
  }

  parsePage(): number | undefined {
    return parseInt(this.searchParams.get('page') as string) || undefined;
  }

  parseFilters(): FILTERS | undefined {
    const filters = this.searchParams.get('filters') as string;
    return filters ? JSON.parse(filters) : undefined;
  }

  parseSort(): SORT | undefined {
    const sort = this.searchParams.get('sort') as string;
    return sort ? JSON.parse(sort) : undefined;
  }
}
