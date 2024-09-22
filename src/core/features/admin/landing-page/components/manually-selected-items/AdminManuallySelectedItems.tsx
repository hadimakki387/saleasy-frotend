import SeCarousel from "@/components/global/carousel/SeCarousel";
import SeEditInput from "@/components/global/SeEditInput";
import Banner from "@/components/global/SeHeroSection";
import ProductCard from "@/core/features/customer/landing/components/SeProductCard";
import LandingCarouselSkeleton from "@/core/features/customer/landing/components/skeletons/LandingCarouselSkeleton";
import { useGetManuallySelectedItemsSectionQuery } from "@/core/features/customer/landing/redux/rtk";
import { ArrowForward } from "@mui/icons-material";
import { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EditBanner from "./EditBanner";
import {
  advertisementSection,
  SectionInterface,
} from "@/core/features/customer/landing/interfaces/link-interface";
import { useDispatch } from "react-redux";
import {
  setAddItemsDialog,
  setAllAdvertisementSections,
  setCreateNewAd,
} from "../../redux/redux";
import { useAppSelector } from "@/providers/StoreWrapper";
import EditAdvertismentSectionDialog from "./EditAdvertismentSectionDialog";
import {
  useAdminGetManuallySelectedItemsSectionQuery,
  useRemoveManuallySelectedItemMutation,
  useUpdateSectionNameMutation,
} from "../../redux/rtk";
import DeleteAdDialog from "./DeleteAdDialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateAdDialog from "./CreateAdDialog";
import { toast } from "sonner";
import SeButton from "@/components/global/SeButton";
import AddItemsDialog from "./add-items/AddItemsDialog";
import AdminProductCard from "./AdminProductItem";

type Props = {};

function AdminManuallySelectedItems() {
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const { data } = useAdminGetManuallySelectedItemsSectionQuery({
    id: store?.id as string,
  });
  const options: EmblaOptionsType = {
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    startIndex: 0,
  };
  const [sectionName, setSectionName] = useState<string>();

  useEffect(() => {
    if (data?.sectionName) setSectionName(data?.sectionName);
  }, [data?.sectionName]);
  const dispatch = useDispatch();
  const [updateSectionName, { isLoading: updateSectionNameLoading }] =
    useUpdateSectionNameMutation();

  if (!data) return <LandingCarouselSkeleton />;
  return (
    <>
      <div className="text-2xl text-primary font-semibold ">
        This is the manually selected items section
        <p className="text-sm text-sub-title-text">
          In this section you can manually select items to be displayed on the
          landing page
        </p>
      </div>
      <div className="my-4">
        <SeButton
          label={"Select Items"}
          color_custom="admin-primary"
          variant="contained"
          onClick={() => {
            dispatch(setAddItemsDialog(true));
          }}
        />
      </div>
      <div className={`relative `}>
        <EditAdvertismentSectionDialog
          fullBanner={data.sections.length ? true : false}
        />
        <DeleteAdDialog />
        <CreateAdDialog />
        <AddItemsDialog />
        <div className=" flex items-center justify-between mb-6 max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:items-start">
          <h3 className="text-2xl font-bold text-primary">
            <SeEditInput
              defaultValue={sectionName || ""}
              onChange={(e) => setSectionName(e as string)}
              handleSubmition={() => {
                console.log("handle sunmission");
                const toastId = toast.loading("Updating Section Name");
                updateSectionName({
                  linkId: store?.link?.id as string,
                  sectionId: data.id,
                  sectionName: sectionName as string,
                  storeId: store?.id as string,
                })
                  .unwrap()
                  .then(() => {
                    toast.dismiss(toastId);
                    toast.success("Section Name Updated Successfully");
                  })
                  .catch((e) => {
                    toast.dismiss(toastId);
                    toast.error(
                      "An error occurred while updating section name"
                    );
                  });
              }}
            />
          </h3>
          <Link
            href={`#`}
            className="relative inline-flex items-center gap-2 pb-1 text-[var(--primary)] font-semibold hover:text-[#1F2937] transition-colors"
          >
            <span className="relative group">
              More Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full group-hover:bg-[#1F2937]"></span>
            </span>
            <ArrowForward className="text-base" />
          </Link>
        </div>
        <div className="mb-2 right-0" style={{ width: `100%` }}>
          <SeCarousel options={options}>
            {data.items?.map((product, index) => {
              return (
                <AdminProductCard
                  key={product.id}
                  id={product.id}
                  imageSrc={product.images[0]}
                  title={product.name}
                  price={product.price}
                  rating={product.rating}
                />
              );
            })}
          </SeCarousel>
        </div>
      </div>

      <div className="text-2xl text-primary font-semibold my-8">
        Edit you Advertisment sections here
        <p className="text-sm text-sub-title-text">
          These sections will only be visible on the desktop version of the site
        </p>
      </div>
      <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col max-sm:hidden">
        {data.sections?.map((ad, index) => {
          return (
            <div className="w-full" key={index}>
              <EditBanner
                fullBanner={data.sections.length > 1}
                data={ad}
                sectionId={data.id}
              />
            </div>
          );
        })}
        {data.sections.length < 2 && (
          <div
            className="h-10 w-10 flex items-center justify-center bg-slate-300 rounded-md cursor-pointer"
            onClick={() => {
              dispatch(setCreateNewAd(data.id));
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="text-primary" />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminManuallySelectedItems;
