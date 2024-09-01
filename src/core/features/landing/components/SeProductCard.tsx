import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import SeProductInfo from "./SeProductInfo";
import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  rating: number;
}

const StarIcon = () => <span className="text-yellow-400 mr-1">★</span>;

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  rating,
}) => {
  const [liked, setLiked] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProductInfo(true);
  };

  const handleCloseProductInfo = () => {
    setShowProductInfo(false);
  };
  const router = useRouter();
  const param = useParams();
  const { store, item } = param;

  return (
    <>
      <SeCard className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full min-w-[300px] h-[400px] justify-between border-2 border-transparent hover:border-[var(--primary)] transition-all group max-sm:min-w-[200px] max-sm:h-[280px]">
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-4">
          <FontAwesomeIcon
            icon={faEye}
            className="text-gray-500 hover:text-[var(--primary)] cursor-pointer"
            onClick={handleEyeClick}
          />
          <FontAwesomeIcon
            icon={faHeart}
            className={`text-gray-500 cursor-pointer ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
            onClick={handleLikeClick}
          />
        </div>
        <Image
          height={200}
          width={200}
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4 max-sm:h-32"
        />
        <h2 className="text-[var(--title-text)] text-sm font-semibold mb-2 text-center truncate">
          {title}
        </h2>
        <p className="text-gray-900 font-bold text-sm mb-2 text-center">
          ${price}
        </p>
        <div className="flex items-center justify-center mb-2">
          <Rating name="read-only" value={rating} readOnly size="small" />

          <span className="text-gray-600 ml-1 text-sm">{rating}</span>
        </div>
        <SeButton
          fullWidth
          label={"Add To Cart"}
          variant="outlined"
          color="primary"
          onClick={() => {
            router.push(`/store/${store}/item/${item}`);
          }}
        />
      </SeCard>

      {showProductInfo && (
        <SeProductInfo
          imageSrc={imageSrc}
          title={title}
          price={price}
          rating={rating}
          onClose={handleCloseProductInfo}
        />
      )}
    </>
  );
};

export default ProductCard;
