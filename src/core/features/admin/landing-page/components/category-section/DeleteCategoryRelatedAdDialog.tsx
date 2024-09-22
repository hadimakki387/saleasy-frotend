import SeDialog from "@/components/global/SeDialog";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { useCategoriesRelatedDeleteAdvertisementSectionMutation } from "./redux/rtk";
import { setCategoryRelatedItemsSelectedDeleteAd } from "../../redux/redux";

type Props = {};

function DeleteCategoriesRelatedAdDialog({}: Props) {
  const { categoryRelatedItemsSelectedDeleteAd } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );
  const [
    deleteAdvertisementSection,
    { isLoading: deleteAdvertisementSectionLoading },
  ] = useCategoriesRelatedDeleteAdvertisementSectionMutation();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <SeDialog
      okText="Delete"
      onOk={() => {
        const toastId = toast.loading("Deleting item...");
        deleteAdvertisementSection({
          advertismentId: categoryRelatedItemsSelectedDeleteAd?.id || "",
          linkId: store?.link.id || "",
          sectionId: categoryRelatedItemsSelectedDeleteAd?.sectionId || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setCategoryRelatedItemsSelectedDeleteAd(null));
            toast.dismiss(toastId);
            toast.success("Item deleted successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("An error occurred while deleting item");
          });
      }}
      onClose={() => {
        dispatch(setCategoryRelatedItemsSelectedDeleteAd(null));
      }}
      open={categoryRelatedItemsSelectedDeleteAd ? true : false}
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

export default DeleteCategoriesRelatedAdDialog;
