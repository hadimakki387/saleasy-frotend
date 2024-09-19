"use client";
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faPen,
  faPlus,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { CategoryWithSubCategoriesInterface } from "../interfaces/categories-with-sub-categories";
import CustomImage from "@/components/global/CustomImage";
import SeTextField from "@/components/global/SeTextField";
import { Tooltip } from "@mui/material";
import {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateCategoryNameMutation,
  useUpdateSubCategoryMutation,
} from "../redux/rtk";
import SeLoader from "@/components/global/SeLoader";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  setDeleteCategoryId,
  setSelectedCategory,
  setSelectedSubCat,
} from "../redux/redux";

type Props = {
  category: CategoryWithSubCategoriesInterface;
};

function CategoryAccordion({ category }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [isEditCategory, setIsEditCategory] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<string>("");
  const [isCreateSubCategory, setIsCreateSubCategory] =
    useState<boolean>(false);
  const { store } = useParams();
  const [
    createSubCategory,
    {
      isLoading: createSubCategoryLoading,
      isSuccess: createSubCategorySuccess,
    },
  ] = useAddSubCategoryMutation();
  const [
    updateSubCategory,
    {
      isLoading: updateSubCategoryLoading,
      isSuccess: updateSubCategorySuccess,
    },
  ] = useUpdateSubCategoryMutation();
  const [
    updateCategoryName,
    {
      isLoading: updateCategoryNameLoading,
      isSuccess: updateCategoryNameSuccess,
    },
  ] = useUpdateCategoryNameMutation();
  const dispatch = useDispatch();

  const [updateSelectedSubCat, setUpdateSelectedSubCat] = useState<string>("");
  const [updateSubCatName, setUpdateSubCatName] = useState<string>("");

  return (
    <div className="shadow-md shadow-neutral-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CustomImage
            src={category.image}
            size={24}
            className="w-12 h-12 rounded-md"
            alt={category.name}
          />
          {!isEditCategory ? (
            <p className="select-none">{category.name}</p>
          ) : (
            <div className="flex items-center gap-4">
              <SeTextField
                placeholder="Name"
                value={editCategoryName}
                onChange={(e) => {
                  setEditCategoryName(e.target.value);
                }}
              />
              {!updateCategoryNameLoading ? (
                <>
                  <Tooltip title="Submit" placement="top">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="cursor-pointer"
                      onClick={() => {
                        updateCategoryName({
                          name: editCategoryName,
                          categoryId: category.id,
                          storeId: store as string,
                        })
                          .unwrap()
                          .then(() => {
                            toast.success("Category Updated");
                            setIsEditCategory(false);
                          });
                      }}
                    />
                  </Tooltip>

                  <Tooltip title="Cancel">
                    <FontAwesomeIcon
                      icon={faX}
                      className="cursor-pointer"
                      onClick={() => {
                        setIsEditCategory(false);
                        setEditCategoryName(category.name);
                      }}
                    />
                  </Tooltip>
                </>
              ) : (
                <SeLoader size={12} />
              )}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="cursor-pointer text-error text-sm"
            onClick={() => {
              dispatch(setDeleteCategoryId(category.id));
            }}
          />
          <FontAwesomeIcon
            icon={faPen}
            className="cursor-pointer text-primary text-sm"
            onClick={() => {
              setIsEditCategory(true);
              setEditCategoryName(category.name);
            }}
          />
          <FontAwesomeIcon
            icon={expanded ? faAngleUp : faAngleDown}
            onClick={() => {
              setExpanded(!expanded);
            }}
            className="cursor-pointer"
          />
        </div>
      </div>
      {expanded && (
        <div className="mt-4">
          {category.subCategories.map((subcat, index) => (
            <div
              key={index}
              className="p-2 select-none flex items-center justify-between"
            >
              {updateSelectedSubCat === subcat.id ? (
                <div className="flex items-center gap-2">
                  <SeTextField
                    placeholder="Name"
                    className="w-44"
                    value={updateSubCatName}
                    onChange={(e) => setUpdateSubCatName(e.target.value)}
                  />

                  {!updateSubCategoryLoading ? (
                    <>
                      <Tooltip title="Submit" placement="top">
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="cursor-pointer"
                          onClick={() => {
                            updateSubCategory({
                              name: updateSubCatName,
                              subCategoryId: updateSelectedSubCat,
                              storeId: store as string,
                            })
                              .unwrap()
                              .then(() => {
                                toast.success("Sub Category Created");
                                setUpdateSelectedSubCat("");
                              });
                          }}
                        />
                      </Tooltip>

                      <Tooltip title="Cancel">
                        <FontAwesomeIcon
                          icon={faX}
                          className="cursor-pointer"
                          onClick={() => {
                            setUpdateSelectedSubCat("");
                          }}
                        />
                      </Tooltip>
                    </>
                  ) : (
                    <SeLoader size={12} />
                  )}
                </div>
              ) : (
                <>
                  {" "}
                  <p>{subcat.name}</p>
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="cursor-pointer text-error text-sm"
                      onClick={() => {
                        dispatch(setSelectedCategory(category.id));
                        dispatch(setSelectedSubCat(subcat.id));
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faPen}
                      className="cursor-pointer text-primary text-sm"
                      onClick={() => {
                        setUpdateSelectedSubCat(subcat.id);
                        setUpdateSubCatName(subcat.name);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ))}
          {!isCreateSubCategory ? (
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-primary p-2"
              onClick={() => {
                setIsCreateSubCategory(true);
              }}
            />
          ) : (
            <div className="flex items-center gap-2">
              <SeTextField
                placeholder="Name"
                className="w-44"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              {!createSubCategoryLoading ? (
                <>
                  <Tooltip title="Submit" placement="top">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="cursor-pointer"
                      onClick={() => {
                        createSubCategory({
                          name: name,
                          category: category.id,
                          storeId: store as string,
                        })
                          .unwrap()
                          .then(() => {
                            toast.success("Sub Category Created");
                            setIsCreateSubCategory(false);
                          });
                      }}
                    />
                  </Tooltip>

                  <Tooltip title="Cancel">
                    <FontAwesomeIcon
                      icon={faX}
                      className="cursor-pointer"
                      onClick={() => {
                        setIsCreateSubCategory(false);
                      }}
                    />
                  </Tooltip>
                </>
              ) : (
                <SeLoader size={12} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CategoryAccordion;