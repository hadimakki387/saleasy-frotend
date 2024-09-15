import SeButton from "@/components/global/SeButton";
import { useAppSelector } from "@/providers/StoreWrapper";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setDeleteCategoryId } from "../../redux/redux";
import SeDialog from "@/components/global/SeDialog";
import { useDeleteCategoryMutation } from "../../redux/rtk";
import { useParams } from "next/navigation";

type Props = {};

function DeleteCategoryDialog({}: Props) {
  const dispatch = useDispatch();
  const { store } = useParams();
  const { deleteCategoryId } = useAppSelector(
    (state) => state.AdminCategoriesSlice
  );
  const [
    deleteCategory,
    { isLoading: deleteCategoryLoading, isSuccess: deleteCategorySuccess },
  ] = useDeleteCategoryMutation();
  return (
    <SeDialog
      styling={{
        okButton: {
          color: "error",
        },
        closeButton: {
          color: "admin-primary",
        },
      }}
      onOk={() => {
        const toastId = toast.loading("Deleting Sub Category");
        deleteCategory({
          categoryId: deleteCategoryId as string,
          storeId: store as string,
        })
          .unwrap()
          .then(() => {
            toast.dismiss(toastId);
            toast.success("Sub Category Deleted");
            dispatch(setDeleteCategoryId(null));
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Failed to delete sub category");
          });
      }}
      open={deleteCategoryId ? true : false}
      onClose={() => {
        dispatch(setDeleteCategoryId(null));
      }}
    >
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Delete Category</h1>
        <p>Are you sure you want to delete this category?</p>
      </div>
    </SeDialog>
  );
}

export default DeleteCategoryDialog;
