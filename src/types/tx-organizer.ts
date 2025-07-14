export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  status:
    | "WAITING_CONFIRMATION"
    | "WAITING_PAYMENT"
    | "DONE"
    | "CANCELED"
    | "EXPIRED"
    | "REJECTED";
  paymentProof: string | null;
  quantity: number;
  totalPaid: number;
  usedPoints: number;
  expiredAt: string; // ISO string
  createdAt: string;
  updatedAt: string;
  voucherId: number | null;

  user: {
    id: number;
    email: string;
    name: string;
    profilePicture: string | null;
  };

  event: {
    id: number;
    title: string;
    description: string;
    picture: string;
    category: string;
    location: string;
    price: number;
    isPaid: boolean;
    startDate: string;
    endDate: string;
    seats: number;
    organizerId: number;
    createdAt: string;
    updatedAt: string;
  };
}
