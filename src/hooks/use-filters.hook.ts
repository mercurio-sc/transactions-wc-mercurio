import { useState, useCallback } from "react";

import { DEFAULT_FILTER_SELECTED } from "@wc/constants/table.constants";

export default function useFilters() {
  const [filterSelected, setFilterSelected] = useState<string>(
    DEFAULT_FILTER_SELECTED
  );

  const onUpdateFilterSelected = useCallback(
    (filterKey: string) => setFilterSelected(filterKey),
    []
  );

  return {
    filterSelected,
    onUpdateFilterSelected,
  };
}
