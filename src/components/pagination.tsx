import {
  Select,
  SelectItem,
  Pagination as NextUIPagination,
} from "@nextui-org/react";

import useMainContext from "@wc/hooks/use-main-context.hook";
import { PAGE_SIZE_OPTIONS } from "@wc/constants/table.constants";

export default function Pagination() {
  const { pagination, totalPages } = useMainContext();

  const { page, pageSize, onUpdatePage, onUpdatePageSize } = pagination;

  if (totalPages <= 0) return null;

  return (
    <div className="flex w-full justify-end px-2">
      <Select
        aria-label="rows per page"
        className="mr-4 w-1/12"
        variant="flat"
        size="sm"
        radius="full"
        placeholder="Filas por página"
        selectedKeys={[String(pageSize)]}
        onChange={onUpdatePageSize}
        disallowEmptySelection
      >
        {PAGE_SIZE_OPTIONS.map((rowsNumber) => (
          <SelectItem
            aria-label={`select ${rowsNumber.key}`}
            key={rowsNumber.key}
          >
            {rowsNumber.label}
          </SelectItem>
        ))}
      </Select>
      <NextUIPagination
        classNames={{
          cursor: [
            "bg-primary/20",
            "shadow-none",
            "text-secondary",
            "font-semibold",
          ],
        }}
        variant="flat"
        size="sm"
        showShadow={false}
        radius="full"
        isCompact
        showControls
        color="secondary"
        page={page}
        total={totalPages}
        onChange={onUpdatePage}
      />
    </div>
  );
}
