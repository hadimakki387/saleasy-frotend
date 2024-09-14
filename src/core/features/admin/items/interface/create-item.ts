export interface CreateItemDto {
  subCategory: string;

  store: string;

  name: string;

  description: string;

  price: number;

  images: string[];

  stock: number;
}
