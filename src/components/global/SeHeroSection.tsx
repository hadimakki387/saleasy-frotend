import React from "react";
import SeButton from "./SeButton";
import { advertisementSection } from "@/core/features/landing/interfaces/link-interface";

interface BannerProps {
  data: advertisementSection;
  imageUrl?: string;
  fullBanner?: boolean;
}

const Banner: React.FC<BannerProps> = ({
  data,
  imageUrl = "https://bazaar.ui-lib.com/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fbanner-18.jpg&w=750&q=75",
  fullBanner = false,
}) => {
  console.log(data.redText);
  return (
    <div className="item-nkw  w-full">
      {fullBanner ? (
        <div
          className="relative overflow-hidden h-[13rem]"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center">
            <p className="text-xs font-light tracking-wider">{data.text1}</p>
            <h4 className="text-lg font-semibold my-4 leading-none">
              {data.text2}
              <br />
              <span className="font-light text-red-500">{data.redText}</span>
            </h4>
            <a
              href={data.link.target}
              className="text-gray-800 font-semibold inline-flex items-center relative pb-1 hover:text-gray-800"
            >
              {data.link.title}
              <svg
                className="w-4 h-4 inline-block fill-current ml-2 transition-transform"
                viewBox="0 0 24 24"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </a>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="relative overflow-hidden h-[13rem]"
            style={{
              backgroundImage: `url('${imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center justify-center gap-1 text-4xl font-[800] text-primary h-full">
              <p className=" tracking-wider">{data.text1?.toUpperCase()}</p>
              <h4 className="  my-4 leading-none text-error">
                {data.redText?.toUpperCase()}
              </h4>
              <span className="">{data.text2?.toUpperCase()}</span>
            </div>
            <div className="absolute right-4 top-4 bottom-4  flex items-center">
              <SeButton
                label={data.link.title}
                variant="outlined"
                color="primary"
                sx={{
                  padding: "0.75rem 3rem",
                  fontSize: "1rem",
                  textTransform: "none",
                }}
                noBorder
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
