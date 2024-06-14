import { useQuery } from "react-query";

import axiosInstance from "@wc/api/interceptor";
import { GetTransactionsRequest } from "@wc/api/types/get-transactions.request.dto";
import { GetTransactionsResponse } from "@wc/api/types/get-transactions.response.dto";

export default function useGetTransactions(options: GetTransactionsRequest) {
  const { page, limit, sellerId, filter } = options;
  const getTransactionsQuery = useQuery<GetTransactionsResponse>(
    ["transactions", page, limit, sellerId, filter],
    () =>
      axiosInstance<GetTransactionsResponse>({
        url: "/",
        method: "GET",
        params: {
          page,
          limit,
          sellerId,
          filter,
        },
      }).then((res) => res.data),
    { keepPreviousData: true }
  );

  return getTransactionsQuery;
}
