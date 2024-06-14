export interface GetTransactionsRequest {
  page: number;
  limit: number;
  sellerId: number;
  filter: string;
}
