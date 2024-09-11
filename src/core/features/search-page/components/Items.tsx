import SeLoader from "@/components/global/SeLoader";
import SeTextField from "@/components/global/SeTextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSearchItemsQuery } from "../redux/rtk";
import ItemCard from "./ItemCard";
import SeFilterDropDown from "@/components/global/SeFilterDropDown";
import ItemCardSkeleton from "./skeletons/ItemCardSkeleton";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../redux/redux";

type Props = {};

function Items({}: Props) {
  const params = useSearchParams();
  const [limit, setLimit] = useState<number>(5); // Start with an initial limit of 5
  const observerRef = useRef<HTMLDivElement | null>(null); // Reference for the observer
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [order, setOrder] = useState<string>("asc");
  const getSearch = params.get("q");
  const dispatch = useDispatch();
  const router = useRouter();

  const sort = { [sortBy]: order.toUpperCase() };
  const query: any = { limit, ...sort };
  if (getSearch) {
    console.log("getSearch", getSearch);
    query.name = getSearch;
  }
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
      <div className="flex justify-end items-center gap-4 mb-4 max-sm:flex-col max-sm:items-start">
        Sort By:{" "}
        <SeFilterDropDown
          order={order}
          defaultValue={sortBy}
          options={[
            {
              label: "price",
              value: "price",
            },
            {
              label: "Date Created",
              value: "createdAt",
            },
          ]}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          setOrder={(e) => {
            setOrder(e);
          }}
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-8 ">
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
