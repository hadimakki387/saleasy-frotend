import React, { useState, useEffect } from "react";

import ProductCard from "./SeProductCard";
import { EmblaOptionsType } from "embla-carousel";
import SeCarousel from "@/components/global/carousel/SeCarousel";
import DealsOfTheDay from "./DealsOfTheDay";

type Product = {
  id: number;
  imageSrc: string;
  title: string;
  price: number;
  rating: number;
};

interface ProductSectionProps {
  visibleCards?: number;
  containerWidthPercentage?: number;
  className?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  visibleCards = 5,
  containerWidthPercentage = 100,
  className = "",
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/test/products2");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const options: EmblaOptionsType = {
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    startIndex: 0,
  };

  return (
    <div className={`relative ${className}`}>
      <DealsOfTheDay />
      <div
        className=" right-0"
        style={{ width: `${containerWidthPercentage}%` }}
      >
        <SeCarousel options={options}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imageSrc={product.imageSrc}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </SeCarousel>
      </div>
    </div>
  );
};

export default ProductSection;
