import { MainInterface } from "@/services/types";

export interface ItemInterface extends MainInterface {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: 5;
  discount: number;
  rating: number;
  options: { name: string; options: string[] }[];
}
