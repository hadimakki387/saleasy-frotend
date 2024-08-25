import React from 'react';

const ItemSection: React.FC = () => {
    return (
        <div className="flex-none bg-white text-gray-800 shadow-md rounded-md p-5 min-w-[300px] h-[385px]">
            <h3 className="text-2xl font-bold">Electronic</h3>
            <ul className="list-none my-3 py-2">
                {[
                    'Wireless Speaker',
                    'Tablet',
                    'Smartphone',
                    'Laptop',
                    'iMac',
                    'Game Controller',
                    'Drone',
                    'Apple',
                ].map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center text-sm font-medium py-1.5 hover:text-red-600"
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <a
                href="/"
                className="flex items-center text-sm font-semibold hover:text-gray-800 mt-auto"
            >
                <span>Browse All</span>
                <svg
                    className="ml-2 w-4 h-4 fill-current text-gray-800"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                </svg>
            </a>
        </div>
    );
};

export default ItemSection;
