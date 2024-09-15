import SeDialog from "@/components/global/SeDialog";
import React, { useEffect, useState } from "react";
import { useGetCategoriesByStoreIdQuery } from "../../sub-categories/redux/rtk";
import { useParams } from "next/navigation";
import SeTextField from "@/components/global/SeTextField";
import { useFormik } from "formik";
import * as Yup from "yup";
import SeButton from "@/components/global/SeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useCreatedItemMutation, useUploadImageMutation } from "../redux/rtk";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useDispatch } from "react-redux";
import { setCreateItemDialogOpen } from "../redux/redux";
import Image from "next/image";

type Props = {
  debouncedSearch: string;
};

function AddItemDialog({ debouncedSearch }: Props) {
  const { store } = useParams();
  const { data: subCategories, isLoading: loadingCategories } =
    useGetCategoriesByStoreIdQuery(store as string);
  const [images, setImages] = useState<File[]>([]);
  const [uploadImage] = useUploadImageMutation();
  const [createItem, { isLoading: loadingCreateItem }] =
    useCreatedItemMutation();
  const { createItemDialogOpen,limit,page } = useAppSelector(
    (state) => state.AdminItemsSlice
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      stock: "",
      subCategoryId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      description: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      stock: Yup.number().required("Required"),
      subCategoryId: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      if (images.length === 0) {
        toast.error("Please upload images");
        return;
      }
      const toastId = toast.loading("Creating Item");
      const uploadImages = images.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);
        const uploadedImage = uploadImage(formData)
          .unwrap()
          .then((res) => {
            return res.id;
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Error Uploading Image");
          });
        return uploadedImage;
      });
      Promise.all(uploadImages).then((res) => {
        createItem({
          data: {
            description: values.description,
            price: Number(values.price),
            stock: Number(values.stock),
            subCategory: values.subCategoryId,
            images: res as string[],
            name: values.name,
            store: store as string,
          },
          storeId: store as string,
          name: debouncedSearch,
          page,
          limit,
        })
          .unwrap()
          .then(() => {
            dispatch(setCreateItemDialogOpen(false));
            formik.resetForm();
            toast.dismiss(toastId);
            toast.success("Item Created");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Error Creating Item");
          });
      });
    },
  });

  return (
    <SeDialog
      open={createItemDialogOpen}
      onClose={() => {
        formik.resetForm();
        dispatch(setCreateItemDialogOpen(false));
      }}
      loading={loadingCategories}
    >
      <div className="space-y-3 p-4">
        <SeTextField label="Name" formik={formik} name="name" />
        <SeTextField label="Description" formik={formik} name="description" />
        <SeTextField label="Price" formik={formik} name="price" type="number" />
        <SeTextField label="stock" formik={formik} name="stock" type="number" />
        <SeTextField
          select
          formik={formik}
          name="subCategoryId"
          label="Sub Category"
          options={subCategories?.map((item) => {
            return { label: item.name, value: item.id };
          })}
        />
        <div className="space-y-2 rounded-md">
          {images.map((image) => (
            <div key={image.name} className="flex items-center justify-between">
              <Image
                src={URL.createObjectURL(image)}
                width={75}
                height={75}
                className="rounded-md w-16 h-16"
                alt={image.name}
              />
              <FontAwesomeIcon
                icon={faTrashCan}
                className="cursor-pointer text-error"
                onClick={() => {
                  setImages(images.filter((img) => img.name !== image.name));
                }}
              />
            </div>
          ))}
        </div>
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
                setImages(Array.from(e.target.files));
              }}
              id="dropzone-file"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <SeButton
            label={"Submit"}
            color_custom="admin-primary"
            variant="contained"
            onClick={() => {
              formik.handleSubmit();
            }}
          />
        </div>
      </div>
    </SeDialog>
  );
}

export default AddItemDialog;
