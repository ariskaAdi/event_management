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
}

export interface EventDetailProps {
  event: {
    title: string;
    description: string;
    picture: string;
    price: number;
    location: string;
    startDate: string;
    endDate: string;
    seats: number;
  };
}
