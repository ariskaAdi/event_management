export interface EventData {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  picture: string;
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
