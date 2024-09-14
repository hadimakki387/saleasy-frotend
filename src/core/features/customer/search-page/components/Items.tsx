import SeLoader from "@/components/global/SeLoader";
import SeTextField from "@/components/global/SeTextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSearchItemsQuery } from "../redux/rtk";
import ItemCard from "./ItemCard";
import SeFilterDropDown from "@/components/global/SeFilterDropDown";
import ItemCardSkeleton from "./skeletons/ItemCardSkeleton";
import { useDispatch } from "react-redux";
import { setOrder, setSearchResults, setSortBy } from "../redux/redux";
import SeButton from "@/components/global/SeButton";
import { useAppSelector } from "@/providers/StoreWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFilter } from "@fortawesome/free-solid-svg-icons";
import { setIsSearchDrawerOpen } from "@/components/global-slice";

type Props = {};

function Items({}: Props) {
  const params = useSearchParams();
  const [limit, setLimit] = useState<number>(5); // Start with an initial limit of 5
  const observerRef = useRef<HTMLDivElement | null>(null); // Reference for the observer
  const { order, sortBy, maxPrice, minPrice, maxDiscount, minDiscount } =
    useAppSelector((state) => state.SearchPageSlice);
  const getSearch = params.get("q");
  const dispatch = useDispatch();
  const router = useRouter();

  const sort = { [sortBy]: order.toUpperCase() };
  const query: any = { limit, ...sort };
  if (getSearch) {
    console.log("getSearch", getSearch);
    query.name = getSearch;
  }
  console.log(maxPrice, minPrice, maxDiscount, minDiscount);
  if (maxPrice !== 100 || minPrice !== 0) {
    query.minPrice = minPrice;
    query.maxPrice = maxPrice;
  }
  if (maxDiscount !== 100 || minDiscount !== 0) {
    query.minDiscount = minDiscount;
    query.maxDiscount = maxDiscount;
  }

  console.log("query", query);
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchItemsQuery(query);
  useEffect(() => {
    dispatch(setSearchResults(searchData?.data.length || 0));
  }, [searchData]);
  useEffect(() => {
    if (!searchLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];

          if (entry.isIntersecting) {
            setLimit((prevLimit) => prevLimit + 5); // Increase limit by 10
          }
        },
        { threshold: 0.5 } // Trigger when 100% of the observer is visible
      );

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => {
        if (observerRef.current) {
          observer.unobserve(observerRef.current);
        }
      };
    }
  }, [searchLoading]);

  if (searchLoading)
    return (
      <div className=" grid grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-8">
        {Array.from({ length: 15 }).map((_, index) => {
          return <ItemCardSkeleton key={index} />;
        })}
      </div>
    );

  return (
    <div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-8 ">
        <div
          className={`flex items-center lg:hidden col-span-2 justify-end mb-4 text-primary`}
        >
          <FontAwesomeIcon
            icon={faFilter}
            onClick={() => {
              dispatch(setIsSearchDrawerOpen(true));
            }}
            style={{
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </div>
        {searchData?.data.map((prod, index) => {
          return <ItemCard key={index} product={prod} />;
        })}
      </div>
      {/* Observer element */}
      <div ref={observerRef} className="h-10 w-full"></div>
    </div>
  );
}

export default Items;
