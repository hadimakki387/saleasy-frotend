import React from "react";

interface PromoBannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonHoverColor?: string;
}

const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  subtitle,
  buttonText,
  buttonLink = "#",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  buttonColor = "bg-gray-900",
  buttonHoverColor = "hover:bg-gray-700",
}) => {
  return (
    <div
      className={`flex flex-wrap gap-20 p-8 ${backgroundColor} rounded-lg shadow-lg relative`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h3 className={`text-2xl font-semibold ${textColor}`}>
          {title} <span className="text-red-500">{subtitle}</span>
        </h3>
        <p className="text-gray-600 mt-2">{subtitle}</p>
      </div>
      <a
        href={buttonLink}
        className={`flex items-center justify-center px-6 py-2.5 ${buttonColor} text-white font-semibold text-sm rounded shadow-md transition-transform transform ${buttonHoverColor} hover:scale-105`}
      >
        {buttonText}
        <span className="absolute inset-0 rounded-lg bg-gray-900 opacity-10"></span>
      </a>
    </div>
  );
};

export default PromoBanner;
