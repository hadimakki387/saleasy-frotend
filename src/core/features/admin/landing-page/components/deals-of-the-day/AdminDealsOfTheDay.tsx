import SeCarousel from "@/components/global/carousel/SeCarousel";
import ProductCard from "@/core/features/customer/landing/components/SeProductCard";
import LandingCarouselSkeleton from "@/core/features/customer/landing/components/skeletons/LandingCarouselSkeleton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowForward } from "@mui/icons-material";
import { EmblaOptionsType } from "embla-carousel";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDealsOfTheDayCreateNewAd } from "../../redux/redux";
import CreateDealsOfTheDayAdDialog from "./CreateDealsOfTheDayAdDialog";
import DeleteDealsOfTheDayAdDialog from "./DeleteDealsOfTheDayAdDialog";
import EditDealsOfTheDayBanner from "./EditDealsOfTheDaytBanner";
import { useAdminGetStoreDealsOfTheDayQuery } from "./redux/rtk";
import EditDealsOfTheDayAdvertismentSectionDialog from "./EditDealsAdvertismentSectionDialog";

interface ProductSectionProps {
  visibleCards?: number;
  containerWidthPercentage?: number;
  className?: string;
  title?: string;
}

const AdminDealsOfTheDay = ({
  visibleCards = 5,
  containerWidthPercentage = 100,
  className = "",
  title = "Deals Of The Day",
}: ProductSectionProps) => {
  const { store } = useParams();
  const { data: dealsOfTheDay } = useAdminGetStoreDealsOfTheDayQuery({
    id: store as string,
  });

  const dispatch = useDispatch();

  const options: EmblaOptionsType = {
    loop: false,
    align: "start",
    containScroll: "trimSnaps",
    startIndex: 0,
  };
  if (!dealsOfTheDay) return <LandingCarouselSkeleton />;

  return (
    <div className={`relative ${className}`}>
      <div className="text-2xl text-primary font-semibold mb-10">
        These are the deals of the day
        <p className="text-sm text-sub-title-text">
          In this section, you can see the items that have the highest discount
          and limited quantity
        </p>
        <p className="text-xs text-error">un-editable section</p>
      </div>
      <CreateDealsOfTheDayAdDialog />
      <DeleteDealsOfTheDayAdDialog />
      <EditDealsOfTheDayAdvertismentSectionDialog
        fullBanner={dealsOfTheDay.sections.advertisementSection.length === 2}
      />
      <div className=" flex items-center justify-between mb-6  max-sm:flex max-sm:flex-col max-sm:gap-2 max-sm:items-start">
        <h3 className="text-2xl font-bold text-primary ">{title}</h3>
        <Link
          href={`/store/${store}/search`}
          className="relative inline-flex items-center gap-2  text-[var(--primary)] font-semibold hover:text-[#1F2937] transition-colors"
        >
          <span className="relative group">
            More Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full group-hover:bg-[#1F2937]"></span>
          </span>
          <ArrowForward className="text-base" />
        </Link>
      </div>
      <div
        className=" right-0"
        style={{ width: `${containerWidthPercentage}%` }}
      >
        <SeCarousel options={options}>
          {dealsOfTheDay.items.map((product) => (
            <ProductCard
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
      <div className="text-2xl text-primary font-semibold my-8">
        Edit you Advertisment sections here
        <p className="text-sm text-sub-title-text">
          These sections will only be visible on the desktop version of the site
        </p>
      </div>
      <div className="flex items-center gap-4 w-full sm:max-h-[15rem] max-sm:flex-col max-sm:hidden">
        {dealsOfTheDay.sections?.advertisementSection.map((ad, index) => {
          return (
            <div className="w-full" key={index}>
              <EditDealsOfTheDayBanner
                fullBanner={
                  dealsOfTheDay.sections.advertisementSection.length > 1
                }
                data={ad}
                sectionId={dealsOfTheDay.sections.id}
              />
            </div>
          );
        })}
        {dealsOfTheDay.sections.advertisementSection.length < 2 && (
          <div
            className="h-10 w-10 flex items-center justify-center bg-slate-300 rounded-md cursor-pointer"
            onClick={() => {
              dispatch(setDealsOfTheDayCreateNewAd(dealsOfTheDay.sections.id));
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="text-primary" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDealsOfTheDay;
