export interface OrderOption {
  key: string;
  value: string;
}
export interface ShippingInfo {
  name: string;
  country: string;
  company: string | null;
  address: string;
  city: string;
  method: "ship" | "pick";
}
export interface CreateOrderDto {
  storeId: string;
  items: {
    id: string;
    quantity: number;
    options: OrderOption[];
  }[];
  shippingInfo: ShippingInfo;
}
