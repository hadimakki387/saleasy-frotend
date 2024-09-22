import SeDialog from "@/components/global/SeDialog";
import { useAppSelector } from "@/providers/StoreWrapper";
import React from "react";
import { useDeleteAdvertisementSectionMutation } from "../../redux/rtk";
import { useDispatch } from "react-redux";
import { setDealsOfTheDaySelectedDeleteAd } from "../../redux/redux";
import { toast } from "sonner";
import { useDealsOfTheDayDeleteAdvertisementSectionMutation } from "./redux/rtk";

type Props = {};

function DeleteDealsOfTheDayAdDialog({}: Props) {
  const { dealsOfTheDaySelectedDeleteAd } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );
  const [
    deleteAdvertisementSection,
    { isLoading: deleteAdvertisementSectionLoading },
  ] = useDealsOfTheDayDeleteAdvertisementSectionMutation();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <SeDialog
      okText="Delete"
      onOk={() => {
        const toastId = toast.loading("Deleting item...");
        deleteAdvertisementSection({
          advertismentId: dealsOfTheDaySelectedDeleteAd?.id || "",
          linkId: store?.link.id || "",
          sectionId: dealsOfTheDaySelectedDeleteAd?.sectionId || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setDealsOfTheDaySelectedDeleteAd(null));
            toast.dismiss(toastId);
            toast.success("Item deleted successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("An error occurred while deleting item");
          });
      }}
      onClose={() => {
        dispatch(setDealsOfTheDaySelectedDeleteAd(null));
      }}
      open={dealsOfTheDaySelectedDeleteAd ? true : false}
      styling={{
        okButton: {
          color: "error",
          variant: "contained",
        },
        closeButton: {
          color: "admin-primary",
          variant: "outlined",
        },
      }}
    >
      <div>Are you sure you want to delete this item?</div>
    </SeDialog>
  );
}

export default DeleteDealsOfTheDayAdDialog;
