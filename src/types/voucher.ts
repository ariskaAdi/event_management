export interface IVoucher {
  id: number;
  code: string;
  discount: number;
  discountType: "FIXED" | "PERCENTAGE";
  quota: number;
  used: number;
  startDate: string;
  endDate: string;
  eventId: number;
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
  usages: {
    id: number;
    userId: number;
    voucherId: number;
  }[];
}
