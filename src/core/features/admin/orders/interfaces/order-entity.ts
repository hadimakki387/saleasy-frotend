import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { MainInterface } from "@/services/types";
export enum OrderStatus {
  PENDING = "pending",
  SHIPPING = "shipping",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}
export interface OrderOptionsEntity extends MainInterface {
  options: {
    key: string;
    value: string;
  }[];
  quantity: number;
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images?: string[];
  };
}
export interface IOrder extends MainInterface {
  items: ItemInterface[];
  total: number;
  orderOptions: OrderOptionsEntity[];
  shippingInfo: {
    name: string;
    country: string;
    company: string | null;
    address: string;
    city: string;
    method: "ship" | "pick";
  };

  status: OrderStatus;
}
