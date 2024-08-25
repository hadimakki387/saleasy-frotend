import React from "react";

interface SeProductInfoProps {
    imageSrc: string;
    title: string;
    price: number;
    rating: number;
    description?: string;
    onClose: () => void;
}

const StarIcon = () => <span className="text-yellow-400 mr-1">★</span>;

const SeProductInfo: React.FC<SeProductInfoProps> = ({ imageSrc, title, price, rating,
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",  // Default description

    onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-4xl relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl">
                    ✕
                </button>
                <div className="flex">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-1/2 h-80 object-cover rounded-md mr-8"
                    />
                    <div className="flex flex-col justify-between w-1/2">
                        <div>
                            <h2 className="text-gray-900 font-bold text-3xl mb-4">{title}</h2>
                            <p className="text-red-500 font-bold text-4xl mb-4">${price}</p>
                            <div className="flex items-center mb-4">
                                {[...Array(rating)].map((_, i) => (
                                    <StarIcon key={i} />
                                ))}
                                <span className="text-gray-600 ml-2 text-lg">({rating})</span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {description}                            </p>
                        </div>
                        <button className="bg-[var(--primary)] text-white py-3 px-6 rounded-lg w-full text-lg hover:bg-opacity-90">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeProductInfo;
