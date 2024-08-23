import React from "react";

interface BannerProps {
    title?: string;
    subtitle?: string;
    discount?: string;
    imageUrl?: string;
}

const Banner: React.FC<BannerProps> = ({
    title = "NEW ARRIVALS",
    subtitle = "SKI CLOTHES SALE",
    discount = "Up to 35% Off",
    imageUrl = "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fbanner-18.jpg&w=750&q=75",
}) => {
    return (
        <div className="item-nkw p-6 md:basis-1/3 flex-grow-0">
            <div className="relative overflow-hidden">
                <img width="330" height="239" src={imageUrl} alt="Banner Image" />
                <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center">
                    <p className="text-xs font-light tracking-wider">{title}</p>
                    <h4 className="text-lg font-semibold my-4 leading-none">
                        {subtitle}
                        <br />
                        <span className="font-light text-red-500">{discount}</span>
                    </h4>
                    <a href="/" className="text-gray-800 font-semibold inline-flex items-center relative pb-1 hover:text-gray-800">
                        Shop Now
                        <svg
                            className="w-4 h-4 inline-block fill-current ml-2 transition-transform"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Banner;
