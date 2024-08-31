import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import React from "react";

type Props = {
  text1: string;
  text2: string;
  text3: string;
  bgImage: string;
};

function SideHeroBox({ text1, text2, text3, bgImage }: Props) {
  return (
    <div
      className="bg-neutral-300 h-full flex flex-col justify-center pl-4"
      style={{
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="text-base font-light">{text1}</p>
      <p className="font-semibold text-xl">{text2}</p>
      <p className="font-semibold text-xl">{text3}</p>
      <LinkArrowAnimation />
    </div>
  );
}

export default SideHeroBox;
