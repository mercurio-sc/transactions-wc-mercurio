import { useCallback, useMemo } from "react";
import {
  Table as NextUITable,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Spinner } from "@nextui-org/spinner";

import {
  COLUMNS,
  DISABLED_ACTIONS_STATUS,
} from "@wc/constants/table.constants";
import {
  Status,
  Transaction,
} from "@wc/api/types/get-transactions.response.dto";
import useMainContext from "@wc/hooks/use-main-context.hook";
import getValueFromPathUtil from "@wc/utils/get-value-from-path.util";

import Description from "./description";
import ActionButton from "./action-button";
import NotificationAction from "./actions/notification-action";
import { LinkAction } from "./actions/link-action";
import Filters from "./filters";
import Pagination from "./pagination";

export default function Table() {
  const {
    items,
    loadingState,
    detailsModal,
    authentication,
    onSelectTransaction,
  } = useMainContext();

  const classNames = useMemo(
    () => ({
      th: [
        "bg-[#CBDEFF]",
        "font-bold",
        "text-foreground-primary",
        "first:rounded-bl-none",
        "last:rounded-br-none",
        "border-r border-[#9BBDF6]",
        "last:border-none",
      ],
      td: [
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        "group-data-[middle=true]:before:rounded-none",
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
        "border-r",
        "last:border-none",
        "overflow-auto",
        "max-h-[300px]",
      ],
    }),
    []
  );

  const columns = useMemo(
    () =>
      authentication.isAdmin
        ? COLUMNS.splice(0, 8, { key: "vendor.name", label: "Vendedor" })
        : COLUMNS,
    [authentication.isAdmin]
  );

  const renderCell = useCallback((row: Transaction, columnKey: string) => {
    const cellValue = getValueFromPathUtil(row, columnKey);

    switch (columnKey) {
      case "createdAt":
        return new Date(cellValue!).toLocaleDateString("es-CO");
      case "amount":
        return new Intl.NumberFormat("es-CO", {
          currency: "COP",
          style: "currency",
          minimumFractionDigits: 0,
        }).format(+cellValue!);
      case "description":
        return <Description>{cellValue}</Description>;
      case "status": {
        const chipProps: Record<string, ChipProps> = {
          [Status.NEW]: { children: "Nuevo", color: "primary" },
          [Status.NOTIFIED]: { children: "Notificado", color: "warning" },
          [Status.OPEN]: { children: "Abierto", color: "secondary" },
          [Status.PAYMENT]: { children: "Pago", color: "warning" },
          [Status.CLOSED]: { children: "Completado", color: "success" },
          [Status.EXPIRED]: { children: "Expirado", color: "danger" },
          [Status.FAILED]: { children: "Fallido", color: "danger" },
          "N/A": { children: "N/A", color: "default" },
        };

        return <Chip variant="flat" {...chipProps[cellValue!]} />;
      }
      case "actions": {
        const disableAction = DISABLED_ACTIONS_STATUS.includes(row.status);

        return (
          <div className="relative flex items-center gap-1">
            <ActionButton
              icon="eye"
              title="Ver detalles de la venta rápida"
              onClick={() => {
                onSelectTransaction(row);
                detailsModal.onOpen();
              }}
            />

            <LinkAction href={row.url_endpoint} disabled={disableAction} />

            <NotificationAction
              utid={row.utid}
              methods={row.notification.availableMethods}
              disabled={disableAction}
            />
          </div>
        );
      }
      default:
        return cellValue || "N/A";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NextUITable
      classNames={classNames}
      topContent={<Filters />}
      bottomContent={<Pagination />}
      color="primary"
      isCompact
      isStriped
      fullWidth
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} maxWidth="180">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        loadingContent={<Spinner color="primary" />}
        loadingState={loadingState}
        emptyContent={"No hay ningún registro."}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell className="max-w-[220px]">
                {renderCell(item, columnKey as string)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </NextUITable>
  );
}
