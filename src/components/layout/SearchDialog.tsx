import { useAppSelector } from "@/providers/StoreWrapper";
import React, { useEffect, useState } from "react";
import SeDialog from "../global/SeDialog";
import SeTextField from "../global/SeTextField";
import { products } from "@/fake-db/products-2";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useDispatch } from "react-redux";
import { setIsSearchDialogOpen } from "../global-slice";
import { useSearchItemsQuery } from "@/core/features/customer/search-page/redux/rtk";
import SeLoader from "../global/SeLoader";
import CustomImage from "../global/CustomImage";

type Props = {};

function SearchDialog({}: Props) {
  const { isSearchDialogOpen } = useAppSelector((state) => state.GlobalSlice);
  const [items, setItems] = React.useState(products);
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  const { data: searchItems, isLoading: loadingSearchItems } =
    useSearchItemsQuery({ name: debouncedSearch, limit: 5 });
  return (
    <SeDialog
      open={isSearchDialogOpen}
      onClose={() => {
        dispatch(setIsSearchDialogOpen(false));
      }}
    >
      <SeTextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/store/${params.store}/search?q=${search}`);
            dispatch(setIsSearchDialogOpen(false));
          }
        }}
      />
      {searchItems?.data.length ? (
        <div className="h-40 mt-4 overflow-y-auto space-y-2">
          {searchItems.data.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2"
                onClick={() => {
                  router.push(`/store/${params.store}/search?q=${item.name}`);
                  dispatch(setIsSearchDialogOpen(false));
                }}
              >
                <CustomImage
                  src={item.images[0]}
                  height={50}
                  width={50}
                  className="object-cover rounded-md w-12 h-12"
                  alt={item.name}
                />
                <div className="text-sm">{item.name}</div>
              </div>
            );
          })}
        </div>
      ) : loadingSearchItems ? (
        <div className="flex justify-center mt-4">
          <SeLoader size={20} />
        </div>
      ) : (
        <div className="text-center mt-4">No items found</div>
      )}
    </SeDialog>
  );
}

export default SearchDialog;
