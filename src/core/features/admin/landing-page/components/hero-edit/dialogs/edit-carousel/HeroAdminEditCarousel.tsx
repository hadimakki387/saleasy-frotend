import SeButton from "@/components/global/SeButton";
import { getImageById } from "@/hooks/getImageById";
import { faCheck, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedHeroCarousel } from "../../../../redux/redux";
import SeEditInput from "@/components/global/SeEditInput";
import SeTextField from "@/components/global/SeTextField";
import { UpdateCarouselInterface } from "../../../../interfaces/update-carousel-interface";

export type CarouselProp = {
  id: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  backgroundImage: string;
  link: {
    title: string;
    target: string;
  };
  imageId?: string;
  image?: File;
};

function HeroAdminEditCarousel({
  data,
  handleChange,
}: {
  data: CarouselProp;
  handleChange: (data: UpdateCarouselInterface) => void;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File>();

  useEffect(() => {
    getImageById(data.backgroundImage, (base64data) => {
      if (base64data) {
        setImageSrc(base64data); // Set the image data in the state when ready
      }
    });
  }, [data.backgroundImage]);
  const router = useRouter();
  const dispatch = useDispatch();
  const [text1, setText1] = useState(data.text1);
  const [text2, setText2] = useState(data.text2);
  const [text3, setText3] = useState(data.text3);
  const [text4, setText4] = useState(data.text4);
  const [linkTitle, setLinkTitle] = useState(data.link.title);
  const [linkTarget, setLinkTarget] = useState(data.link.target);
  const [editLink, setEditLink] = useState(false);
  useEffect(() => {
    if (!newImage) {
      return;
    }
    handleChange({
      image: newImage,
      text1,
      text2,
      text3,
      text4,
      buttonTarget: linkTarget,
      buttonTitle: linkTitle,
      itemId: data.id,
      imageId: data.backgroundImage,
    });
  }, [text1, text2, text3, text4, linkTitle, linkTarget, editLink, newImage]);
  return (
    <div className="item-nkw  min-w-full relative">
      <div
        className="relative overflow-hidden min-h-[60vh] max-md:min-h-[35vh] "
        style={{
          backgroundImage: `url('${
            newImage
              ? URL.createObjectURL(newImage)
              : data.backgroundImage
              ? imageSrc
              : "/dummy-bg-image.png"
          }')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="absolute top-4 right-4 bg-primary h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faPen} className="text-xl text-white" />
            </div>
            <input
              onChange={(e) => {
                if (!e.target.files?.length) return;

                setNewImage(e.target.files[0]);
              }}
              id="dropzone-file"
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>

        <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center space-y-4 max-sm:space-y-2">
          <p className="text-3xl font-light tracking-wider max-sm:text-xl">
            <SeEditInput
              defaultValue={text1}
              onChange={(e) => {
                setText1(e as string);
              }}
            />
          </p>

          <h4 className="text-6xl font-semibold  leading-none max-sm:text-3xl">
            <SeEditInput
              defaultValue={text2}
              onChange={(e) => {
                setText2(e as string);
              }}
            />
          </h4>
          <p className="font-medium text-3xl max-sm:text-xl flex items-center gap-1">
            <span className=" min-w-60">
              <SeEditInput
                defaultValue={text3}
                onChange={(e) => {
                  setText3(e as string);
                }}
              />
            </span>
            <span className=" text-red-500 min-w-60">
              <SeEditInput
                defaultValue={text4}
                onChange={(e) => {
                  setText4(e as string);
                }}
              />
            </span>
          </p>
          {!editLink ? (
            <div className="flex items-center gap-1">
              <SeButton
                className="w-1/2"
                label={linkTitle}
                color="primary"
                variant="contained"
                onClick={() => {}}
              />
              <FontAwesomeIcon
                icon={faPen}
                className="text-sm text-primary cursor-pointer"
                onClick={() => {
                  setEditLink(true);
                }}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <SeTextField
                value={linkTitle}
                onChange={(e) => {
                  setLinkTitle(e.target.value);
                }}
              />
              <SeTextField
                value={linkTarget}
                onChange={(e) => {
                  setLinkTarget(e.target.value);
                }}
              />
              <div className="flex items-center justify-end gap-4">
                <FontAwesomeIcon
                  icon={faX}
                  className="text-sm text-primary cursor-pointer"
                  onClick={() => {
                    setEditLink(false);
                  }}
                />
                <FontAwesomeIcon
                  icon={faCheck}
                  className="text-sm text-primary cursor-pointer"
                  onClick={() => {
                    setEditLink(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroAdminEditCarousel;
