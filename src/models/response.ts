export interface APIResponse<T> {
  status?: string;
  errors?: Error;
  data?: T;
}

type SortingDirection = "asc" | "desc";

interface SortingFilter<T> {
  sort_col?: keyof T;
  sort_dir?: SortingDirection;
}

export type QueryFilterParams<T> = {
  [x in keyof PaginatedResponse<T>]?: string | any;
} & { [x in keyof T]?: string | any };

export class PaginatedResponse<T> implements SortingFilter<T>, APIResponse<T> {
  page: number;
  limit: number;
  search?: string;
  sort_col?: keyof T;
  sort_dir?: SortingDirection;
  status?: string;
  errors?: Error;
  data?: T;

  constructor(filter: QueryFilterParams<T>) {
    this.page = filter.page ? parseInt(filter.page as string) : 1;
    this.limit = filter.limit ? parseInt(filter.limit as string) : 10;
    this.search = filter.search as string;
    this.sort_col = filter.sort_col ? (filter.sort_col as keyof T) : undefined;
    this.sort_dir = filter.sort_dir
      ? (filter.sort_dir as SortingDirection)
      : undefined;
    this.data = filter.data ? (filter.data as T) : undefined;
    this.status = filter.status ? (filter.status as string) : undefined;
    this.errors = filter.errors ? (filter.errors as Error) : undefined;
  }
}

export interface Pagination<TFil, TDat> {
  filter_info: TFil;
  count_info: {
    filtered_records: number;
    total_record: number;
    page_count: number;
  };
  data: TDat[];
}
