export type IUser = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "ORGANIZER";
  profilePicture?: string | null;
  bio?: string | null;
};

export type JwtPayload = {
  userId: number;
  email: string;
  role: "CUSTOMER" | "ORGANIZER";
  iat: number;
  exp: number;
};
