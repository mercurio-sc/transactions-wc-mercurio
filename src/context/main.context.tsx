import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { useDisclosure } from "@nextui-org/react";

import { Transaction } from "@wc/api/types/get-transactions.response.dto";
import usePagination from "@wc/hooks/use-pagination.hook";
import useFilters from "@wc/hooks/use-filters.hook";
import useGetTransactions from "@wc/hooks/use-get-transactions.hook";
import useNotifyTransaction from "@wc/hooks/use-notify-transaction.hook";
import useAuthentication from "@wc/hooks/use-authentication.hook";

interface ContextInterface {
  authentication: ReturnType<typeof useAuthentication>;
  detailsModal: ReturnType<typeof useDisclosure>;
  filters: ReturnType<typeof useFilters>;
  items: Transaction[];
  loadingState: "loading" | "idle";
  notificationMutation: ReturnType<typeof useNotifyTransaction>;
  onSelectTransaction: (transaction: Transaction) => void;
  pagination: ReturnType<typeof usePagination>;
  totalPages: number;
  transaction: Transaction | undefined;
}

export const Context = createContext<ContextInterface>(null!);

export function ContextProvider({
  children,
  authentication,
}: {
  children: ReactNode;
  authentication: ReturnType<typeof useAuthentication>;
}) {
  const [transaction, setTransaction] = useState<Transaction>();

  const filters = useFilters();
  const pagination = usePagination();
  const detailsModal = useDisclosure();

  const transactionsQuery = useGetTransactions({
    page: pagination.page - 1,
    limit: pagination.pageSize,
    sellerId: authentication?.uid ?? 0,
    filter: filters.filterSelected,
  });

  const notificationMutation = useNotifyTransaction();

  const loadingState =
    transactionsQuery.isLoading || !transactionsQuery.data ? "loading" : "idle";
  const items = useMemo(
    () => transactionsQuery.data?.data ?? [],
    [transactionsQuery]
  );
  const totalPages = useMemo(
    () => transactionsQuery.data?.pageTotal ?? 0,
    [transactionsQuery]
  );

  const onSelectTransaction = useCallback(
    (transaction: Transaction) => setTransaction(transaction),
    []
  );

  return (
    <Context.Provider
      value={{
        authentication,
        detailsModal,
        filters,
        items,
        loadingState,
        notificationMutation,
        onSelectTransaction,
        pagination,
        totalPages,
        transaction,
      }}
    >
      {children}
    </Context.Provider>
  );
}
