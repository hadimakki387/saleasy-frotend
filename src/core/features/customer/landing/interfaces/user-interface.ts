import { MainInterface } from "@/services/types";

export interface UserInterface extends MainInterface {
  name: string;

  email: string;

  id: string;

  isDeactivated: boolean;

  phoneNumber: string;

  token: string;

  totalOrders: number;

  totalSpent: number;

  role: "admin" | "user";
}
