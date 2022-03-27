export interface BaseQuery {
  limit?: number;
  offset?: number;
  search?: string;
}
export interface BookQueries extends BaseQuery {
  category?: string;
  startPrice?: number;
  endPrice?: number;
  cloudTag?: string;
}
