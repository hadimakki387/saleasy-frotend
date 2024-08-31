export interface ProductInterface {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  rating: number;
}
export const products: ProductInterface[] = [
  {
    id: 1,
    title: "North Star Blue",
    price: 110,
    imageSrc: "/pants.png",
    rating: 4,
  },
  {
    id: 2,
    title: "Silver High Neck Sweater",
    price: 210,
    imageSrc: "/t-shirt-1.png",
    rating: 3,
  },
  {
    id: 3,
    title: "Yellow Casual Sweater",
    price: 110,
    imageSrc: "/t-shirt-2.png",
    rating: 5,
  },
  {
    id: 4,
    title: "Denim Blue Jeans",
    price: 140,
    imageSrc: "/shoes-1.png",
    rating: 2,
  },
  {
    id: 5,
    title: "Black White Sweater",
    price: 180,
    imageSrc: "/shoes-2.png",
    rating: 4,
  },
  { id: 6, title: "najo7", price: 1400, imageSrc: "/t-shirt-1.png", rating: 1 },
  { id: 7, title: "fashol", price: 100, imageSrc: "/t-shirt-2.png", rating: 5 },
  {
    id: 8,
    title: "Black White Sweater",
    price: 180,
    imageSrc: "/t-shirt-2.png",
    rating: 3,
  },
  { id: 9, title: "najo7", price: 1400, imageSrc: "/pants.png", rating: 2 },
  {
    id: 10,
    title: "fashol",
    price: 100,
    imageSrc: "/t-shirt-1.png",
    rating: 4,
  },
];
