import { useAppSelector } from "@/providers/StoreWrapper";
import React from "react";
import SeDialog from "../global/SeDialog";
import SeTextField from "../global/SeTextField";
import { products } from "@/fake-db/products-2";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setIsSearchDialogOpen } from "../global-slice";

type Props = {};

function SearchDialog({}: Props) {
  const { isSearchDialogOpen } = useAppSelector((state) => state.GlobalSlice);
  const [items, setItems] = React.useState(products);
  const [search, setSearch] = React.useState("");

  React.useEffect(() => {
    if (search) {
      const filteredItems = products.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setItems(filteredItems);
    } else {
      setItems(products);
    }
  }, [search]);
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();

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
      />
      {items.length ? (
        <div className="h-40 mt-4 overflow-y-auto">
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2"
                onClick={() => {
                  router.push(
                    `/store/${params.store}/search?category=${item.title}`
                  );
                  dispatch(setIsSearchDialogOpen(false));
                }}
              >
                <Image
                  src={item.imageSrc}
                  height={50}
                  width={50}
                  className="object-cover rounded-md"
                  alt={item.title}
                />
                <div className="text-sm">{item.title}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-4">No items found</div>
      )}
    </SeDialog>
  );
}

export default SearchDialog;
