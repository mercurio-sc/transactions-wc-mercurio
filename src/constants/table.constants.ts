import { Status } from "@wc/api/types/get-transactions.response.dto";

/** The default page size used for pagination. */
export const DEFAULT_PAGE_SIZE = "10";

/** The default filter selected in the table. */
export const DEFAULT_FILTER_SELECTED = "all";

export const MAX_LENGTH_DESCRIPTION = 50;

/** The default column selected in the table. */
export const DISABLED_ACTIONS_STATUS = [
  Status.CLOSED,
  Status.EXPIRED,
  Status.FAILED,
  Status.CANCELED,
];

/** Options for the page size in a table. */
export const PAGE_SIZE_OPTIONS = [
  {
    key: "10",
    label: "10 filas",
  },
  {
    key: "20",
    label: "20 filas",
  },
  {
    key: "50",
    label: "50 filas",
  },
];

export const COLUMNS = [
  {
    key: "utid",
    label: "ID",
  },
  {
    key: "createdAt",
    label: "Fecha",
  },
  {
    key: "amount",
    label: "Valor",
  },
  {
    key: "client.name",
    label: "Cliente",
  },
  {
    key: "client.phone",
    label: "Celular",
  },
  {
    key: "client.email",
    label: "Correo",
  },
  {
    key: "description",
    label: "Descripción",
  },
  {
    key: "status",
    label: "Estado",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];

export const FILTERS = [
  {
    key: "all",
    label: "Todos",
    description:
      "Se pueden visualizar todas las transacciones y con todos los estados.",
  },
  {
    key: "new",
    label: "Nuevos",
    description:
      "Se pueden visualizar todas las ventas rápidas recién creadas.",
  },
  {
    key: "notified",
    label: "Notificados",
    description:
      "Se pueden visualizar ventas rápidas enviadas/notificadas por correo electrónico.",
  },
  {
    key: "open",
    label: "Abiertos",
    description:
      "Se visualiza aquí cuando un usuario abre el enlace y no continúa con el proceso de pago.",
  },
  {
    key: "payment",
    label: "En pago",
    description:
      "Lista de ventas rápidas que llegaron hasta la pasarela de pagos pero no se completó el proceso.",
  },
  {
    key: "closed",
    label: "Completados",
    description:
      "Lista de ventas rápidas que completaron el proceso de pago y se aprobó el crédito.",
  },
  {
    key: "expired",
    label: "Expirados",
    description:
      "Lista de todas las transacciones de venta rápida que no se finalizaron por parte del cliente en el tiempo establecido.",
  },
  {
    key: "failed",
    label: "Fallidos",
    description:
      "Lista de todas las transacciones de venta rápida en las que no se efectuó el pago.",
  },
];
