import { Container } from "@mui/material";
import React from "react";

interface CardProps {
  imageSrc: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title }) => {
  return (
    <div className="group relative flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[236.525px] h-[241.525px]">
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-auto max-h-full object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>
      <div className="mt-2 w-full">
        <p className="text-center text-gray-700 group-hover:bg-[var(--primary)] group-hover:text-[var(--secondary)] transition-colors duration-300 p-2 rounded-lg">
          {title}
        </p>
      </div>
    </div>

  );
};

export default Card;
