export type ITransactionStatus =
  | "WAITING_PAYMENT"
  | "WAITING_CONFIRMATION"
  | "EXPIRED"
  | "CANCELED"
  | "DONE"
  | "REJECTED";

export interface ITransaction {
  id: number;
  status: ITransactionStatus;
  quantity: number;
  totalPaid: number;
  createdAt: string;
  expiredAt: string;
  user: {
    name: string;
    email: string;
  };
  event: {
    title: string;
    description: string;
    picture: string;
    location: string;
    price: number;
    startDate: string;
    endDate: string;
  };
}
