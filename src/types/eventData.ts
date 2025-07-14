export interface EventData {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  picture: string;
  organizer: {
    name: string;
    email: string;
    profilePicture?: string | null;
  };
  startDate: string;
  endDate: string;
  seats: number;
  category: string;
  organizerId: number;
  vouchers: {
    code: string;
    discount: number;
    discountType: string;
    quota: number;
    used: number;
    startDate: string;
    endDate: string;
  }[];
}

export interface EventDetailProps {
  id: number;
  title: string;
  description: string;
  picture: string;
  price: number;
  location: string;
  startDate: string;
  endDate: string;
  seats: number;
  organizer: {
    name: string;
    email: string;
    profilePicture?: string | null;
    bio?: string | null;
    role?: string; // optional karena tidak dikirim dari backend
  };
  vouchers: {
    id: number;
    code: string;
    discount: number;
    discountType: string;
    quota: number;
    used: number;
    startDate: string;
    endDate: string;
  }[];
}
