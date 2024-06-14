import { useState, useCallback } from "react";

import { DEFAULT_PAGE_SIZE } from "@wc/constants/table.constants";

export default function usePagination() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(+DEFAULT_PAGE_SIZE);

  const onUpdatePage = useCallback((page: number) => setPage(page), []);

  const onUpdatePageSize = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) =>
      setPageSize(Number(event.target.value)),
    []
  );

  return {
    page,
    pageSize,
    onUpdatePage,
    onUpdatePageSize,
  };
}
