import { useTheme } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import SeCarousel from "../../../../components/global/carousel/SeCarousel";
import SeButton from "../../../../components/global/SeButton";
import Image from "next/image";
import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import SideHeroBox from "./side-hero-box";

const mySlider = [
  { text: "MEN", link: "/banner-15.jpg" },
  { text: "WOMEN", link: "/banner-25.jpg" },
];

const Hero: React.FC = () => {
  const theme = useTheme();
  return (
    <div className="xl:grid xl:grid-cols-8 gap-4">
      <div className="col-span-8 xl:col-span-6">
        <SeCarousel
          options={{
            align: "center",
          }}
        >
          {mySlider.map((item, index) => (
            <div className="item-nkw  min-w-full" key={index}>
              <div
                className="relative overflow-hidden min-h-[60vh] max-md:min-h-[35vh]"
                style={{
                  backgroundImage: `url('${item.link}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center space-y-4 max-sm:space-y-2">
                  <p className="text-3xl font-light tracking-wider max-sm:text-xl">
                    LIFESTYLE COLLECTION
                  </p>
                  <h4 className="text-6xl font-semibold  leading-none max-sm:text-3xl">
                    MEN
                  </h4>
                  <p className="font-medium text-3xl max-sm:text-xl">
                    SALE UP TO <span className=" text-red-500">30% OFF</span>
                  </p>
                  <SeButton
                    className="w-1/2"
                    label="SHOP NOW"
                    color="primary"
                    variant="contained"
                  />
                </div>
              </div>
            </div>
          ))}
        </SeCarousel>
      </div>
      <div className=" col-span-8 xl:col-span-2 flex flex-col gap-4 max-xl:flex-row max-xl:h-[20rem] max-sm:hidden">
        <div className="max-xl:w-full h-full">
          <SideHeroBox
            text1="NEW ARRIVALS"
            text2="SUMMER"
            text3="SALE 20% OFF"
            bgImage="/shoes.jpg"
          />
        </div>
        <div className="max-xl:w-full h-full">
          <SideHeroBox
            text1="NEW ARRIVALS"
            text2="WINTER"
            text3="SALE 50% OFF"
            bgImage="/computer.jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
