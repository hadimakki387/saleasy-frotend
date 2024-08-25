// src/components/global/SeUsedComponents/IconSection.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAmazon, faApple, faGoogle, faMicrosoft, faFacebook } from '@fortawesome/free-brands-svg-icons'; // Add other icons as needed

interface IconSectionProps {
    icons: { icon: any; alt: string }[]; // Define icons array
}

const BrandIcons: React.FC<IconSectionProps> = ({ icons }) => {
    return (
        <div className="w-full bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h3 className="text-xl font-bold mb-4 text-center">Featured Brands</h3>
                <div className="flex justify-between items-center overflow-x-auto">
                    {icons.map((item, index) => (
                        <div key={index} className="flex-shrink-0 p-2">
                            <FontAwesomeIcon icon={item.icon} size="3x" aria-label={item.alt} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandIcons;
