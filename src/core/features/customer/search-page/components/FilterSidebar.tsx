"use client";
import { categories } from "@/fake-db/categories";
import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import SeTextField from "@/components/global/SeTextField";
import { Rating } from "@mui/material";
import SeCheckbox from "@/components/global/SeCheckbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/providers/StoreWrapper";
import SeFilterDropDown from "@/components/global/SeFilterDropDown";
import { useDispatch } from "react-redux";
import {
  setMaxDiscount,
  setMaxPrice,
  setMinDiscount,
  setMinPrice,
  setOrder,
  setSortBy,
} from "../redux/redux";

type Props = {};

function FilterSidebar({}: Props) {
  const [value, setValue] = useState<number[]>([0, 100]);
  const [discountValue, setDiscountValue] = useState<number[]>([0, 100]);
  const params = useSearchParams();
  const newUrl = new URLSearchParams(params.toString());
  const router = useRouter();
  const { searchResults, order, sortBy } = useAppSelector(
    (state) => state.SearchPageSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setMinPrice(value[0]));
      dispatch(setMaxPrice(value[1]));
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setMinDiscount(discountValue[0]));
      dispatch(setMaxDiscount(discountValue[1]));
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [discountValue]);
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  function valuetext(value: number) {
    return `${value}`;
  }

  const handleDiscountChange = (event: Event, newValue: number | number[]) => {
    setDiscountValue(newValue as number[]);
  };

  function discountValuetext(value: number) {
    return `${value}`;
  }

  return (
    <div className="bg-white rounded-md p-4 space-y-4 sticky top-24">
      {params.get("q") && (
        <div className="">
          <p className="text-primary font-semibold">
            Searching for {`"${params.get("q")}"`}
          </p>
          <p className="text-sub-title-text text-sm">
            {searchResults} results found
          </p>
          <p
            className="text-error text-sm cursor-pointer hover:underline mt-2"
            onClick={() => {
              newUrl.delete("q");
              router.push(`?${newUrl.toString()}`);
            }}
          >
            Clear Search
          </p>
        </div>
      )}
      <div className="flex items-start">
        <div className="flex justify-end items-center gap-2  max-sm:flex-col max-sm:items-start">
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
              dispatch(setSortBy(e.target.value));
            }}
            setOrder={(e) => {
              dispatch(setOrder(e));
            }}
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className=" text-primary font-semibold">Categories</p>
        <div className="space-y-1">
          {categories?.map((category: string) => (
            <div
              key={category}
              className={` text-sm cursor-pointer text-sub-title-text
                ${
                  params.get("category") === category
                    ? " font-semibold underline"
                    : " font-normal"
                }
              `}
              onClick={() => {
                newUrl.set("category", category);
                router.push(`?${newUrl.toString()}`);
              }}
            >
              {category}
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <p className="text-primary font-semibold">Price Range</p>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          sx={{
            marginLeft: "0 !important",
            // width: "calc(100% - 1rem)",
          }}
          style={{
            color: "var(--error) !important",
          }}
          // color="error"
          size="small"
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        <div className="flex items-center justify-between gap-1 ml-0">
          <SeTextField
            placeholder="Min"
            type="number"
            variant="outlined"
            size="small"
            value={value[0]}
            onChange={(e) => setValue([parseInt(e.target.value), value[1]])}
          />
          -
          <SeTextField
            placeholder="Max"
            type="number"
            variant="outlined"
            size="small"
            value={value[1]}
            onChange={(e) => setValue([value[0], parseInt(e.target.value)])}
          />
        </div>
      </div>
      <div className="">
        <p className="text-primary font-semibold">Discount Range</p>
        <Slider
          getAriaLabel={() => "Discount range"}
          value={discountValue}
          sx={{
            marginLeft: "0 !important",
            // width: "calc(100% - 1rem)",
          }}
          style={{
            color: "var(--error) !important",
          }}
          size="small"
          onChange={handleDiscountChange}
          valueLabelDisplay="auto"
          getAriaValueText={discountValuetext}
        />
        <div className="flex items-center justify-between gap-1 ml-0">
          <SeTextField
            placeholder="Min"
            type="number"
            variant="outlined"
            size="small"
            value={discountValue[0]}
            onChange={(e) =>
              setDiscountValue([parseInt(e.target.value), value[1]])
            }
          />
          -
          <SeTextField
            placeholder="Max"
            type="number"
            variant="outlined"
            size="small"
            value={discountValue[1]}
            onChange={(e) =>
              setDiscountValue([value[0], parseInt(e.target.value)])
            }
          />
        </div>
      </div>
    </div>
  );
}

export default FilterSidebar;
