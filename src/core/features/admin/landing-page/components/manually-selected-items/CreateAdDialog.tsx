import SeButton from "@/components/global/SeButton";
import SeDialog from "@/components/global/SeDialog";
import SeEditInput from "@/components/global/SeEditInput";
import { useAppSelector } from "@/providers/StoreWrapper";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Image from "../../../../../../../public/banner-18.webp";
import { useDispatch } from "react-redux";
import { setCreateNewAd } from "../../redux/redux";
import { useAddAdvertisementSectionMutation } from "../../redux/rtk";
import { toast } from "sonner";

type Props = {};

function CreateAdDialog({}: Props) {
  const { createNewAd } = useAppSelector((state) => state.AdminLandingPageEdit);
  const [text1, setText1] = useState("NEW ARRIVALS");
  const [text2, setText2] = useState("SKI CLOTHES SALE");
  const [redText, setRedText] = useState("Up to 35% Off");
  const [linkTitle, setLinkTitle] = useState("Shop Now");
  const [linkTarget, setLinkTarget] = useState("#");
  const [newImage, setNewImage] = useState<File | null>(null);
  useEffect(() => {
    fetch(Image.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "banner-15.jpg", { type: blob.type });
        setNewImage(file);
      });
  }, []);
  const dispatch = useDispatch();
  const [
    addAdvertisementSection,
    { isLoading: addAdvertisementSectionLoading },
  ] = useAddAdvertisementSectionMutation();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <SeDialog
      open={createNewAd ? true : false}
      onClose={() => {
        dispatch(setCreateNewAd(null));
      }}
      onOk={() => {
        const toastId = toast.loading("Creating new ad...");
        const formData = new FormData();
        if (newImage) {
          formData.append("image", newImage);
        }
        formData.append("text1", text1);
        formData.append("text2", text2);
        formData.append("redText", redText);
        formData.append("linkTitle", linkTitle);
        formData.append("linkTarget", linkTarget);
        addAdvertisementSection({
          item: formData,
          linkId: store?.link.id || "",
          sectionId: createNewAd || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setCreateNewAd(null));
            toast.dismiss(toastId);
            toast.success("Ad created successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("An error occurred while creating ad");
          });
      }}
      styling={{
        okButton: {
          color: "admin-primary",
          variant: "contained",
        },
        closeButton: {
          color: "admin-primary",
          variant: "outlined",
        },
      }}
    >
      {" "}
      <div className="item-nkw  w-full relative">
        <div className="absolute top-4 right-4 z-50 flex gap-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <FontAwesomeIcon icon={faPen} />
              <input
                onChange={(e) => {
                  if (!e.target.files?.length) return;

                  const formData = new FormData();
                  formData.append("file", e.target.files[0]);
                  setNewImage(e.target.files[0]);
                }}
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="max-md:hidden">
          <div
            className="relative overflow-hidden h-[13rem]"
            style={{
              backgroundImage: newImage
                ? `url('${URL.createObjectURL(newImage)}')`
                : `url('${Image.src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center">
              <p className="text-xs font-light tracking-wider">
                <SeEditInput
                  defaultValue={text1}
                  onChange={(e) => {
                    setText1(e as string);
                  }}
                />
              </p>
              <h4 className="text-lg font-semibold my-4 leading-none">
                <SeEditInput
                  defaultValue={text2}
                  onChange={(e) => {
                    setText2(e as string);
                  }}
                />
                <br />
                <span className="font-light text-red-500">
                  <SeEditInput
                    defaultValue={redText}
                    onChange={(e) => {
                      setRedText(e as string);
                    }}
                  />
                </span>
              </h4>
              <a
                href={linkTarget}
                className="text-gray-800 font-semibold inline-flex items-center relative pb-1 hover:text-gray-800"
              >
                {linkTitle}
                <svg
                  className="w-4 h-4 inline-block fill-current ml-2 transition-transform"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </SeDialog>
  );
}

export default CreateAdDialog;
