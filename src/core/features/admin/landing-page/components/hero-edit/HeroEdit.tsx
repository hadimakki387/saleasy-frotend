import SeCarousel from "@/components/global/carousel/SeCarousel";
import HeroCarousel from "@/core/features/customer/landing/components/hero/HeroCarousel";
import SideHeroBox from "@/core/features/customer/landing/components/side-hero-box";
import { ILinkEntity } from "@/core/features/customer/landing/interfaces/link-interface";
import React from "react";
import HeroAdminCarousel from "./HeroAdminCarousel";
import SideHeroBoxAdmin from "./SideHeroBoxAdmin";
import EditHeroCarouselItemsDialog from "./dialogs/edit-carousel/EditHeroCarouselItemsDialog";
import AddHeroCarouselItemDialog from "./dialogs/edit-carousel/AddHeroCarouselItemDialog";
import SeButton from "@/components/global/SeButton";
import { useDispatch } from "react-redux";
import { setCreateNewCarousel } from "../../redux/redux";

type Props = {
  data: ILinkEntity;
};

function HeroEdit({ data }: Props) {
  const dispatch = useDispatch();
  return (
    <div className="xl:grid xl:grid-cols-8 gap-4">
      <EditHeroCarouselItemsDialog />
      <AddHeroCarouselItemDialog />
      <div className="col-span-8 xl:col-span-6">
        <SeCarousel
          options={{
            align: "center",
          }}
        >
          {data?.link?.Hero?.Carousel?.map((item, index) => {
            return (
              <HeroAdminCarousel key={index} data={item} currentIndex={index} />
            );
          })}
        </SeCarousel>
      </div>
      <div className=" col-span-8 xl:col-span-2 flex flex-col gap-4 max-xl:flex-row max-xl:h-[20rem] max-sm:hidden">
        {data?.link?.Hero?.sideBoxes?.map((item, index) => {
          return (
            <div className="max-xl:w-full h-full" key={index}>
              <SideHeroBoxAdmin
                text1={item.text1}
                text2={item.text2}
                text3={item.text3}
                backgroundId={item.backgroundImage}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-end w-full">
        <SeButton
          color_custom="admin-primary"
          variant="contained"
          label={"Add Carousel Item"}
          onClick={() => {
            dispatch(setCreateNewCarousel(true));
          }}
        />
      </div>
    </div>
  );
}

export default HeroEdit;
