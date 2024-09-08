export interface IndexQueryOptions<
  FILTERS = Record<string, unknown>,
  SORT = string[],
> {
  limit?: number;
  page?: number;
  filters?: FILTERS;
  sort?: SORT;
}
