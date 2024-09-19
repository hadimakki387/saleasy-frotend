import SeButton from "@/components/global/SeButton";
import SeDialog from "@/components/global/SeDialog";
import SeEditInput from "@/components/global/SeEditInput";
import SeTextField from "@/components/global/SeTextField";
import { faCheck, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BannerImage from "../../../../../../../../../public/banner-15.jpg";
import { toast } from "sonner";
import { useAddCarouselItemMutation } from "../../../../redux/rtk";
import { useAppSelector } from "@/providers/StoreWrapper";
import { setCreateNewCarousel } from "../../../../redux/redux";

type Props = {};

function AddHeroCarouselItemDialog({}: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  // store the banner-15.jpg as file in the new Image state
  const [newImage, setNewImage] = useState<File | null>(null);
  const { createNewCarousel } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );
  // Convert BannerImage to a Blob and create a File object
  useEffect(() => {
    fetch(BannerImage.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "banner-15.jpg", { type: blob.type });
        setNewImage(file);
      });
  }, []);

  const dispatch = useDispatch();
  const [text1, setText1] = useState("LIFESTYLE COLLECTION");
  const [text2, setText2] = useState("MEN");
  const [text3, setText3] = useState("SALES UP TP");
  const [text4, setText4] = useState("30% OFF");
  const [linkTitle, setLinkTitle] = useState("SHOP NOW");
  const [linkTarget, setLinkTarget] = useState("add link here");
  const [editLink, setEditLink] = useState(false);
  const [addCarouselItem, { isLoading: addCarouselItemLoading }] =
    useAddCarouselItemMutation();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <SeDialog
      open={createNewCarousel}
      okText="Create item"
      onClose={() => {
        dispatch(setCreateNewCarousel(false));
      }}
      maxWidth="lg"
      onOk={() => {
        if (!newImage) {
          toast.error("Please select an image");
          return;
        }
        const formData = new FormData();
        formData.append("image", newImage);
        formData.append("text1", text1);
        formData.append("text2", text2);
        formData.append("text3", text3);
        formData.append("text4", text4);
        formData.append("buttonTitle", linkTitle);
        formData.append("buttonTarget", linkTarget);
        const toastId = toast.loading("Adding carousel item...");
        addCarouselItem({
          item: formData,
          linkId: store?.link.id || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            toast.dismiss(toastId);
            toast.success("Carousel item added successfully");
            dispatch(setCreateNewCarousel(false));
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Failed to add carousel item");
          });
      }}
    >
      <div className="item-nkw  min-w-full relative">
        <div
          className="relative overflow-hidden min-h-[60vh] max-md:min-h-[35vh] "
          style={{
            backgroundImage: newImage
              ? `url('${URL.createObjectURL(newImage)}')`
              : `url('${BannerImage.src}')`, // Fallback to the original image
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
    </SeDialog>
  );
}

export default AddHeroCarouselItemDialog;
