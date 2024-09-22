import SeDialog from "@/components/global/SeDialog";
import { useAppSelector } from "@/providers/StoreWrapper";
import React, { Fragment, useEffect, useState } from "react";
import { setAddItemsDialog } from "../../../redux/redux";
import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { useSearchAdminItemsQuery } from "@/core/features/admin/items/redux/rtk";
import { useRouter } from "nextjs-toploader/app";
import SeTextField from "@/components/global/SeTextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import CustomImage from "@/components/global/CustomImage";
import { Divider, Tooltip } from "@mui/material";
import { sectionsTypes } from "@/core/features/customer/landing/interfaces/link-interface";
import { useUpdateManuallySelectedItemsMutation } from "../../../redux/rtk";
import { toast } from "sonner";

type Props = {};

function AddItemsDialog({}: Props) {
  const { addItemsDialog } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );
  const [search, setSearch] = React.useState("");
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);

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
    useSearchAdminItemsQuery(
      {
        name: debouncedSearch,
        limit: 20,
        page: 1,
        storeId: params.store as string,
      },
      {
        skip: !addItemsDialog,
      }
    );
  const [selectedItems, setSelectedItems] = useState<string[] | undefined>([
    "",
  ]);
  useEffect(() => {
    if (store && addItemsDialog) {
      const selectedItems = store.link.sections.find(
        (section) => section.type === sectionsTypes.manually_selected
      );
      console.log(selectedItems);
      setSelectedItems(selectedItems?.items);
    }
  }, [addItemsDialog]);
  const [
    updateManuallySelectedItems,
    { isLoading: updateManuallySelectedItemsLoading },
  ] = useUpdateManuallySelectedItemsMutation();
  return (
    <SeDialog
      open={addItemsDialog}
      onClose={() => {
        dispatch(setAddItemsDialog(false));
        setSelectedItems([]);
      }}
      onOk={() => {
        if (store) {
          const toastID = toast.loading("Updating items...");
          updateManuallySelectedItems({
            items: selectedItems as string[],
            linkId: store.link.id,
            sectionId: store.link.sections.find(
              (section) => section.type === sectionsTypes.manually_selected
            )?.id as string,
            storeId: store.id,
          })
            .unwrap()
            .then(() => {
              toast.dismiss(toastID);
              toast.success("Items updated successfully");
              setSelectedItems([]);
              dispatch(setAddItemsDialog(false));
            })
            .catch(() => {
              toast.dismiss(toastID);
              toast.error("An error occurred while updating items");
            });
        }
      }}
    >
      <SeTextField
        label="Search"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div className="mt-2 space-y-2 h-64 overflow-auto">
        {loadingSearchItems ? (
          <div>Loading...</div>
        ) : (
          searchItems?.data?.map((item) => (
            <Fragment key={item.id}>
              {" "}
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-4">
                  <CustomImage
                    src={item.images[0]}
                    size={50}
                    alt={item.name}
                    className="w-10 h-10 rounded-md"
                  />
                  <p>{item.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedItems?.includes(item.id) && (
                    <Tooltip title="Selected">
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-success cursor-pointer"
                      />
                    </Tooltip>
                  )}
                  <Tooltip title="Add">
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="cursor-pointer"
                      onClick={() => {
                        if (selectedItems && !selectedItems.includes(item.id)) {
                          setSelectedItems([...selectedItems, item.id]);
                        }
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
              <Divider />
            </Fragment>
          ))
        )}
      </div>
    </SeDialog>
  );
}

export default AddItemsDialog;
