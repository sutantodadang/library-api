export interface APIResponse<T> {
  status?: string;
  errors?: Error;
  data?: T;
}

interface QueryParams {
  title?: string;
  year?: number;
}

export class PaginatedResponse<T> {
  page?: number;
  limit?: number;
  search?: string;
}
