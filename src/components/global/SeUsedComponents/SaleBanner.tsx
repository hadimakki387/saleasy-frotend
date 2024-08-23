import React from 'react';

interface SaleBannerProps {
    title: string;
    subtitle: string;
    price: string;
    imageUrl: string;
}

const SaleBanner: React.FC<SaleBannerProps> = ({ title, subtitle, price, imageUrl }) => {
    return (
        <div className="pt-6 pl-6 w-full md:w-1/2">
            <div
                className="p-8 overflow-hidden rounded-[3px] bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${imageUrl})` }}
            >
                <h4>{title}</h4>
                <h4 className="text-[27px] font-bold text-white">{subtitle}</h4>
                <hr className="mt-2 mb-2 border border-white border-b-[1px] w-[60px]" />
                <p className="text-white text-[16px] font-normal">
                    Starting at <span className="font-bold text-[21px] text-[#D23F57]">{price}</span>
                </p>
            </div>
        </div>
    );
};

export default SaleBanner;
