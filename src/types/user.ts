export type IUser = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "ORGANIZER";
  profilePicture?: string | null;
  bio?: string | null;
};
