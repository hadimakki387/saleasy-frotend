import SeButton from "@/components/global/SeButton";
import { getImageById } from "@/hooks/getImageById";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";

type Props = {
  data: {
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    backgroundImage: string;
    link: {
      title: string;
      target: string;
    };
  };
};

function HeroCarousel({ data }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    getImageById(data.backgroundImage, (base64data) => {
      if (base64data) {
        setImageSrc(base64data); // Set the image data in the state when ready
      }
    });
  }, [data.backgroundImage]);
  const router = useRouter();

  return (
    <div className="item-nkw  min-w-full">
      <div
        className="relative overflow-hidden min-h-[60vh] max-md:min-h-[35vh]"
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center space-y-4 max-sm:space-y-2">
          <p className="text-3xl font-light tracking-wider max-sm:text-xl">
            {data.text1}
          </p>
          <h4 className="text-6xl font-semibold  leading-none max-sm:text-3xl">
            {data.text2}
          </h4>
          <p className="font-medium text-3xl max-sm:text-xl">
            {data.text3} <span className=" text-red-500">{data.text4}</span>
          </p>
          <SeButton
            className="w-1/2"
            label="SHOP NOW"
            color="primary"
            variant="contained"
            onClick={() => {
              router.push(data.link.target);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCarousel;
