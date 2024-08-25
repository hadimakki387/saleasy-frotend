import { useTheme } from "@mui/material";

import "swiper/css";
import "swiper/css/pagination";
import SeCarousel from "../../../../components/global/carousel/SeCarousel";
import SeButton from "../../../../components/global/SeButton";

const mySlider = [
  { text: "MEN", link: "/banner-15.jpg" },
  { text: "WOMEN", link: "/banner-25.jpg" },
];

const Hero: React.FC = () => {
  const theme = useTheme();
  return (
    <div className="grid grid-cols-8 gap-4">
      <div className="col-span-6">
        <SeCarousel
          options={{
            align: "center",
          }}
        >
          {mySlider.map((item, index) => (
            <div className="item-nkw  min-w-full" key={index}>
              <div className="relative overflow-hidden">
                <img
                  src={item.link}
                  alt="Banner Image"
                  className="min-w-full"
                />
                <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center space-y-4">
                  <p className="text-3xl font-light tracking-wider">
                    LIFESTYLE COLLECTION
                  </p>
                  <h4 className="text-6xl font-semibold  leading-none ">MEN</h4>
                  <p className="font-medium text-3xl">
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
      <div className="col-span-2 flex flex-col gap-4">
        <div className="bg-red-400 h-full">sfdg</div>
        <div className="bg-red-400 h-full">dsfgsgh</div>
      </div>
    </div>
  );
};

export default Hero;
