import SeDialog from "@/components/global/SeDialog";
import { useAppSelector } from "@/providers/StoreWrapper";
import React, { useState } from "react";
import HeroAdminCarousel from "../../HeroAdminCarousel";
import HeroAdminEditCarousel from "./HeroAdminEditCarousel";
import { UpdateCarouselInterface } from "../../../../interfaces/update-carousel-interface";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSelectedHeroCarousel } from "../../../../redux/redux";
import { useEditCarouselItemMutation } from "../../../../redux/rtk";

type Props = {};

function EditHeroCarouselItemsDialog({}: Props) {
  const { selectedHeroCarousel } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );
  const [createCarousel, setCreateCarousel] =
    useState<UpdateCarouselInterface>();
  const dispatch = useDispatch();
  const [editCarousel, { isLoading: editCarouselLoading }] =
    useEditCarouselItemMutation();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <SeDialog
      open={selectedHeroCarousel ? true : false}
      maxWidth="lg"
      onClose={() => {
        dispatch(setSelectedHeroCarousel(null));
      }}
      onOk={() => {
        console.log(createCarousel);
        if (!createCarousel?.image && !createCarousel?.imageId) {
          toast.error("Please select an image");
          return;
        }
        const formData = new FormData();
        if (createCarousel?.image) {
          formData.append("image", createCarousel.image);
        }
        formData.append("itemId", selectedHeroCarousel?.id || "");
        formData.append("text1", createCarousel.text1);
        formData.append("text2", createCarousel.text2);
        formData.append("text3", createCarousel.text3);
        formData.append("text4", createCarousel.text4);
        formData.append("buttonTitle", createCarousel.buttonTitle);
        formData.append("buttonTarget", createCarousel.buttonTarget);
        formData.append("imageId", createCarousel.imageId || "");
        const toastId = toast.loading("Updating carousel item...");
        editCarousel({
          item: formData,
          linkId: store?.link.id || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setSelectedHeroCarousel(null));
            toast.dismiss(toastId);
            toast.success("Carousel item updated successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Failed to update carousel item");
          });
      }}
    >
      {selectedHeroCarousel && (
        <HeroAdminEditCarousel
          data={selectedHeroCarousel}
          handleChange={(e) => {
            console.log("this is the e", e);
            setCreateCarousel(e);
          }}
        />
      )}
    </SeDialog>
  );
}

export default EditHeroCarouselItemsDialog;
