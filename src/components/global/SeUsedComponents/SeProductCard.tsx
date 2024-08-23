import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import SeProductInfo from './SeProductInfo';

interface ProductCardProps {
    imageSrc: string;
    title: string;
    price: number;
    rating: number;
}

const StarIcon = () => <span className="text-yellow-400 mr-1">★</span>;

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, title, price, rating }) => {
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

    return (
        <>
            <div className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full max-w-[250px] flex-shrink-0 border-2 border-transparent hover:border-[var(--primary)] transition-all group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-4">
                    <FontAwesomeIcon icon={faEye} className="text-gray-500 hover:text-[var(--primary)] cursor-pointer" onClick={handleEyeClick} />
                    <FontAwesomeIcon
                        icon={faHeart}
                        className={`text-gray-500 cursor-pointer ${liked ? "text-red-500" : "hover:text-red-500"}`}
                        onClick={handleLikeClick}
                    />
                </div>
                <img
                    src={imageSrc}
                    alt={title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-[var(--title-text)] text-sm font-semibold mb-2 text-center truncate">{title}</h2>
                <p className="text-gray-900 font-bold text-sm mb-2 text-center">
                    ${price}
                </p>
                <div className="flex items-center justify-center mb-2">
                    {[...Array(rating)].map((_, i) => (
                        <StarIcon key={i} />
                    ))}
                    <span className="text-gray-600 ml-1 text-sm">{rating}</span>
                </div>
                <button className="bg-transparent text-[var(--primary)] py-2 px-4 rounded-lg mt-4 w-full hover:bg-[var(--primary)] hover:text-white">
                    Add To Cart
                </button>
            </div>

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
