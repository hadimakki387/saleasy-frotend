import React from "react";
import { useDeleteSubCategoryMutation } from "../../redux/rtk";
import SeDialog from "@/components/global/SeDialog";
import SeButton from "@/components/global/SeButton";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/providers/StoreWrapper";
import { setSelectedCategory, setSelectedSubCat } from "../../redux/redux";
import { useDispatch } from "react-redux";

type Props = {};

function DeleteSubCategoryDialog({}: Props) {
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const { store } = useParams();
  const { selectedCategory, selectedSubCat } = useAppSelector(
    (state) => state.AdminCategoriesSlice
  );
  const dispatch = useDispatch();
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
        deleteSubCategory({
          categoryId: selectedCategory as string,
          storeId: store as string,
          subCategoryId: selectedSubCat as string,
        })
          .unwrap()
          .then(() => {
            toast.dismiss(toastId);
            toast.success("Sub Category Deleted");
            dispatch(setSelectedCategory(null));
            dispatch(setSelectedSubCat(null));
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Failed to delete sub category");
          });
      }}
      open={selectedCategory && selectedSubCat ? true : false}
      onClose={() => {
        dispatch(setSelectedCategory(null));
        dispatch(setSelectedSubCat(null));
      }}
    >
      <div className="p-4 space-y-4">
        <h1 className="text-xl font-semibold">Delete Sub Category</h1>
        <p>Are you sure you want to delete this sub category?</p>
      </div>
    </SeDialog>
  );
}

export default DeleteSubCategoryDialog;
