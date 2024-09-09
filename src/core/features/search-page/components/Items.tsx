import SeLoader from "@/components/global/SeLoader";
import SeTextField from "@/components/global/SeTextField";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSearchItemsQuery } from "../redux/rtk";
import ItemCard from "./ItemCard";
import SeFilterDropDown from "@/components/global/SeFilterDropDown";

type Props = {};

function Items({}: Props) {
  const params = useSearchParams();
  const [limit, setLimit] = useState<number>(5); // Start with an initial limit of 5
  const observerRef = useRef<HTMLDivElement | null>(null); // Reference for the observer
  const [sortBy, setSortBy] = useState<string>("price");
  const [order, setOrder] = useState<string>("asc");

  const sort = { [sortBy]: order.toUpperCase() };
  const {
    data: searchData,
    error: searchError,
    isLoading: searchLoading,
  } = useSearchItemsQuery({ limit, ...sort });
  const router = useRouter();

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
      <div className="h-[80vh] flex items-center justify-center">
        <SeLoader />
      </div>
    );

  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-4">
        Sort By:{" "}
        <SeFilterDropDown
          order={order}
          defaultValue={sortBy}
          options={[
            {
              label: "price",
              value: "price",
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
