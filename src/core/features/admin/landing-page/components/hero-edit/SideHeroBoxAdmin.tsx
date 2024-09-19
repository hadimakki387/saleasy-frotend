import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import { getImageById } from "@/hooks/getImageById";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setEditSideBox } from "../../redux/redux";
import { sideBoxInterface } from "@/core/features/customer/landing/interfaces/link-interface";

function SideHeroBoxAdmin({
  text1,
  text2,
  text3,
  backgroundImage,
  id,
  link,
}: sideBoxInterface) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof backgroundImage === "string") {
      getImageById(backgroundImage, (base64data) => {
        if (base64data) {
          setImageSrc(base64data); // Set the image data in the state when ready
        }
      });
    }
  }, [backgroundImage]);
  const dispatch = useDispatch();
  return (
    <div
      className="bg-neutral-300 h-full flex flex-col justify-center pl-4 relative "
      style={{
        backgroundImage: `url('${imageSrc}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute top-4 right-4 bg-primary h-8 w-8 rounded-md flex items-center justify-center cursor-pointer"
        onClick={() => {
          dispatch(
            setEditSideBox({
              text1,
              text2,
              text3,
              id,
              link,
              backgroundImage,
            })
          );
        }}
      >
        <FontAwesomeIcon icon={faPen} className="text-lg text-white" />
      </div>
      <p className="text-base font-light">{text1}</p>
      <p className="font-semibold text-xl">{text2}</p>
      <p className="font-semibold text-xl">{text3}</p>
      <LinkArrowAnimation text={link.title} target={link.target} />
    </div>
  );
}

export default SideHeroBoxAdmin;
