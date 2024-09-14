export interface UpdateItemInterface {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  options: {
    name: string;
    options: string[];
  }[];
}
