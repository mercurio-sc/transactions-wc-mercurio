export interface GetTransactionsResponse {
  data: Transaction[];
  limit: number;
  page: number;
  pageTotal: number;
  total: number;
}

export interface Transaction {
  _id: string;
  utid: string;
  client: Client;
  amount: number;
  description: string;
  payment: null | string;
  notification: Notification;
  status: Status;
  expirationAt: Date;
  createdAt: Date;
  updatedAt: Date;
  url_endpoint: string;
}

export interface Client {
  name: string;
  email: string;
  phone: string;
  document: Document;
  shipping?: Shipping;
}

export interface Document {
  type: string;
  value: string;
}

export interface Shipping {
  address1: string;
  city: string;
  cityCode: string;
  distanceDoor: string;
  junctionNumber: string;
  province: string;
  provinceCode: string;
  roadClass: string;
  roadNumber: string;
  address2?: string;
}

export interface Notification {
  availableMethods: NotificationMethods[];
}

export enum Status {
  NEW = "new",
  NOTIFIED = "notified",
  OPEN = "open",
  PAYMENT = "payment",
  CLOSED = "closed",
  EXPIRED = "expired",
  CANCELED = "canceled",
  FAILED = "failed",
}

export enum NotificationMethods {
  Email = "email",
  SMS = "sms",
  WhatsApp = "whatsapp",
}
