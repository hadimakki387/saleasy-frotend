import SeDialog from "@/components/global/SeDialog";
import { useAppSelector } from "@/providers/StoreWrapper";
import React from "react";
import { useDeleteAdvertisementSectionMutation } from "../../redux/rtk";
import { useDispatch } from "react-redux";
import { setSelectedDeleteAd } from "../../redux/redux";
import { toast } from "sonner";

type Props = {};

function DeleteAdDialog({}: Props) {
  const { selectedDeleteAd } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );
  const [
    deleteAdvertisementSection,
    { isLoading: deleteAdvertisementSectionLoading },
  ] = useDeleteAdvertisementSectionMutation();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <SeDialog
      okText="Delete"
      onOk={() => {
        const toastId = toast.loading("Deleting item...");
        deleteAdvertisementSection({
          advertismentId: selectedDeleteAd?.id || "",
          linkId: store?.link.id || "",
          sectionId: selectedDeleteAd?.sectionId || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setSelectedDeleteAd(null));
            toast.dismiss(toastId);
            toast.success("Item deleted successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("An error occurred while deleting item");
          });
      }}
      onClose={() => {
        dispatch(setSelectedDeleteAd(null));
      }}
      open={selectedDeleteAd ? true : false}
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

export default DeleteAdDialog;
