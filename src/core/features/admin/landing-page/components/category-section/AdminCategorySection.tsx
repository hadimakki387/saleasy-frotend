import SeCarousel from "@/components/global/carousel/SeCarousel";
import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import SeTextField from "@/components/global/SeTextField";
import {
  useGetAdminCategoriesQuery,
  useUpdateCategoryRelatedItemsSectionMutation,
} from "@/core/features/admin/landing-page/redux/rtk";
import LandingCarouselSkeleton from "@/core/features/customer/landing/components/skeletons/LandingCarouselSkeleton";
import { useAppSelector } from "@/providers/StoreWrapper";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";
import { useGetSubCategoriesByStoreIdQuery } from "../../../sub-categories/redux/rtk";
import AdminProductCard from "../manually-selected-items/AdminProductItem";
import { sectionsTypes } from "@/core/features/customer/landing/interfaces/link-interface";
import { useAdminGetCategoryRelatedItemsQuery } from "./redux/rtk";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditDealsOfTheDayBanner from "../deals-of-the-day/EditDealsOfTheDaytBanner";
import { useDispatch } from "react-redux";
import {
  setCategoryRelatedItemsCreateNewAd,
  setDealsOfTheDayCreateNewAd,
} from "../../redux/redux";

type Props = {};

function AdminCategorySection({}: Props) {
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const { data } = useAdminGetCategoryRelatedItemsQuery({
    id: store?.id as string,
  });
  console.log(data);
  const {
    data: categoryData,
    error: categoryError,
    isLoading: categoryLoading,
  } = useGetAdminCategoriesQuery(store?.id as string);
  const [
    updateCategoryRelatedItemsSection,
    { isLoading: updateCategoryLoading },
  ] = useUpdateCategoryRelatedItemsSectionMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  if (!data) return <LandingCarouselSkeleton />;
  return (
    <>
      <div className="text-2xl text-primary font-semibold mb-8">
        This is the category section
        <p className="text-sm text-sub-title-text">
          Here you choose the category you want to display on the landing page
        </p>
      </div>
      <div className="flex items-center justify-end mb-8 ">
        <SeTextField
          label="Search"
          variant="outlined"
          className="w-60"
          fullWidth
          select
          options={categoryData?.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          onChange={(e) => {
            const toastId = toast.loading("Updating Category");
            updateCategoryRelatedItemsSection({
              categoryId: e.target.value,
              storeId: store?.id as string,
              linkId: store?.link?.id as string,
              sectionId: store?.link.sections.find(
                (section) => section.type === sectionsTypes.category_related
              )?.id as string,
            })
              .unwrap()
              .then(() => {
                toast.dismiss(toastId);
                toast.success("Category Updated Successfully");
              })
              .catch(() => {
                toast.dismiss(toastId);
                toast.error("An error occurred while updating category");
              });
          }}
        />
      </div>
      <div className="xl:grid xl:grid-cols-5 gap-4">
        <div className="col-span-1 h-full space-y-4 bg-white p-4 max-xl:hidden">
          <p className="font-bold text-lg">{data.name}</p>

          <div className="space-y-2">
            {data.subCategories.map((subCat, index) => {
              return (
                <div className="cursor-pointer" key={index} onClick={() => {}}>
                  {subCat.name}
                </div>
              );
            })}
          </div>

          <LinkArrowAnimation text="Browse All" textClassName="text-sm" />
        </div>
        <div className="xl:hidden">
          <div className=" flex items-center justify-between mb-6 max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:items-start">
            <h3 className="text-2xl font-bold text-primary ">{data.name}</h3>
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
        </div>
        <div className="col-span-4 ">
          <SeCarousel>
            {data?.items?.map((product, index: any) => (
              <AdminProductCard
                key={product.id}
                id={product.id}
                imageSrc={product.images[0]}
                title={product.name}
                price={product.price}
                rating={product.rating}
              />
            ))}
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
        {data.section.advertisementSection.map((ad, index) => {
          return (
            <div className="w-full" key={index}>
              <EditDealsOfTheDayBanner
                fullBanner={data.section.advertisementSection.length > 1}
                data={ad}
                sectionId={data.id}
              />
            </div>
          );
        })}
        {data.section.advertisementSection.length < 2 && (
          <div
            className="h-10 w-10 flex items-center justify-center bg-slate-300 rounded-md cursor-pointer"
            onClick={() => {
              dispatch(setCategoryRelatedItemsCreateNewAd(data.section.id));
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="text-primary" />
          </div>
        )}
      </div>
    </>
  );
}

export default AdminCategorySection;
