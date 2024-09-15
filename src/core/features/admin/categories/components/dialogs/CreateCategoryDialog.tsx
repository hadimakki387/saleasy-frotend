import SeDialog from "@/components/global/SeDialog";
import SeTextField from "@/components/global/SeTextField";
import { useAppSelector } from "@/providers/StoreWrapper";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { setCreatedCategoryDialog } from "../../redux/redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "../../redux/rtk";
import { useParams } from "next/navigation";

type Props = {};

function CreateCategoryDialog({}: Props) {
  const [image, setImage] = React.useState<File>();
  const { createdCategoryDialog } = useAppSelector(
    (state) => state.AdminCategoriesSlice
  );
  const dispatch = useDispatch();
  const { store } = useParams();
  const [createCategory] = useCreateCategoryMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (!image) {
        toast.error("Please upload an image");
        return;
      }
      const toastId = toast.loading("Creating Category");
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("storeId", store as string);

      createCategory({
        storeId: store as string,
        data: formData,
      })
        .unwrap()
        .then(() => {
          toast.dismiss(toastId);
          toast.success("Category Created");
          dispatch(setCreatedCategoryDialog(false));
        })
        .catch(() => {
          toast.dismiss(toastId);
          toast.error("Failed to create category");
        });
    },
  });
  return (
    <SeDialog
      open={createdCategoryDialog}
      onClose={() => {
        dispatch(setCreatedCategoryDialog(false));
      }}
      onOk={() => {
        formik.handleSubmit();
      }}
    >
      <div className="space-y-3">
        <h1 className="text-xl font-semibold">Create Category</h1>
        <SeTextField label="Name" formik={formik} name="name" />
        <SeTextField label="Description" formik={formik} name="description" />
        {!image ? (
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="  rounded-md flex flex-col items-center  w-full   cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div>
                Upload Images <FontAwesomeIcon icon={faPlus} className="mt-2" />
              </div>
              <input
                onChange={(e) => {
                  if (!e.target.files?.length) return;
                  setImage(e.target.files[0]);
                }}
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col">
            <Image
              src={URL.createObjectURL(image)}
              alt="category"
              width={100}
              height={100}
              className="rounded-md w-h-24 h-24"
            />
            <FontAwesomeIcon
              icon={faTrashCan}
              className="mt-2 text-error text-sm cursor-pointer"
              onClick={() => setImage(undefined)}
            />
          </div>
        )}
      </div>
    </SeDialog>
  );
}

export default CreateCategoryDialog;
