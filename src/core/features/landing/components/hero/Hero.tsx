import { useTheme } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import SeCarousel from "../../../../../components/global/carousel/SeCarousel";
import SeButton from "../../../../../components/global/SeButton";
import Image from "next/image";
import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import SideHeroBox from "../side-hero-box";
import { ILinkEntity } from "../../interfaces/link-interface";
import { getImageById } from "@/hooks/getImageById";
import { useEffect } from "react";
import HeroCarousel from "./HeroCarousel";

const mySlider = [
  { text: "MEN", link: "/banner-15.jpg" },
  { text: "WOMEN", link: "/banner-25.jpg" },
];

const Hero = ({ data }: { data: ILinkEntity }) => {
  return (
    <div className="xl:grid xl:grid-cols-8 gap-4">
      <div className="col-span-8 xl:col-span-6">
        <SeCarousel
          options={{
            align: "center",
          }}
        >
          {data?.link?.Hero?.Carousel?.map((item, index) => {
            return <HeroCarousel key={index} data={item} />;
          })}
        </SeCarousel>
      </div>
      <div className=" col-span-8 xl:col-span-2 flex flex-col gap-4 max-xl:flex-row max-xl:h-[20rem] max-sm:hidden">
        {data?.link?.Hero?.sideBoxes?.map((item, index) => {
          return (
            <div className="max-xl:w-full h-full" key={index}>
              <SideHeroBox
                text1={item.text1}
                text2={item.text2}
                text3={item.text3}
                backgroundId={item.backgroundImage}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
