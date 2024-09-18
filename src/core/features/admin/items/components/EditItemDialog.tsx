"use client";
import SeToggleButtonGroup from "@/components/global/SeToggleButtonGroup";
import { Rating } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/providers/StoreWrapper";
import CustomImage from "@/components/global/CustomImage";
import SeDialog from "@/components/global/SeDialog";
import { setSelectedItem } from "../redux/redux";
import SeEditInput from "@/components/global/SeEditInput";
import SeButton from "@/components/global/SeButton";
import SeTextField from "@/components/global/SeTextField";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useDeleteImageMutation,
  useUpdateItemImageMutation,
  useUpdateItemMutation,
  useUploadImageMutation,
} from "../redux/rtk";
import SeLoader from "@/components/global/SeLoader";
import { toast } from "sonner";
import { useParams } from "next/navigation";

type Props = {
  debouncedSearch: string;
};

function EditItemDialog({ debouncedSearch }: Props) {
  const { selectedItem, limit, page } = useAppSelector(
    (state) => state.AdminItemsSlice
  );
  const [image, setImage] = useState<string>();
  const [addOption, setAddOption] = useState(false);
  const [opt, setOpt] = useState<
    | {
        id: number;
        name: string;
        options: string[];
      }[]
  >([]);

  useEffect(() => {
    if (selectedItem) setImage(selectedItem?.images[0]);
  }, [selectedItem]);
  const [selectedOptions, setSelectedOptions] = useState<
    { key: string; value: string }[]
  >([]);
  const dispatch = useDispatch();

  const handleOptionChange = (key: string, value: string) => {
    setSelectedOptions((prevOptions) => {
      // Update the specific option by key, or add a new one if it doesn't exist
      const updatedOptions = prevOptions.filter((opt) => opt.key !== key);
      return [...updatedOptions, { key, value }];
    });
  };

  const [uploadImageMutation, { isLoading: uploadingImage }] =
    useUploadImageMutation();

  const [updateImages, { isLoading: updatingImages }] =
    useUpdateItemImageMutation();

  const [deleteImage, { isLoading: deletingImage }] = useDeleteImageMutation();

  const [saveChanges, { isLoading: savingChanges }] = useUpdateItemMutation();
  const { store } = useParams();
  const [onlineOptions, setOnlineOptions] = useState<string[]>([]);

  return (
    <>
      {selectedItem && (
        <SeDialog
          open={selectedItem ? true : false}
          maxWidth="lg"
          onClose={() => {
            dispatch(setSelectedItem(null));
            setOpt([]);
          }}
        >
          <div className="space-y-16 py-8">
            <div className="flex items-start gap-4 justify-center max-lg:flex-col">
              <div className="flex justify-center flex-col items-center w-full">
                <div className="w-full flex justify-center mb-4">
                  {selectedItem.images[0] ? (
                    <CustomImage
                      src={image || selectedItem.images[0]}
                      alt="item"
                      size={400}
                      className="rounded-md border-2 border-neutral-200 max-w-[400px] w-full h-[400px] max-sm:h-auto max-sm:mb-4 "
                    />
                  ) : (
                    <div className="w-full h-[400px] bg-neutral-200 rounded-md flex items-center justify-center cursor-pointer">
                      <p className="text-sub-title-text text-2xl">
                        Add an image
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  {selectedItem.images.map((img) => (
                    <div
                      key={img}
                      className="flex flex-col justify-center gap-1"
                    >
                      <CustomImage
                        src={img}
                        size={100}
                        alt="item"
                        onClick={() => {
                          setImage(img);
                        }}
                        className={`cursor-pointer rounded-md border-2 h-20 w-20 transition-all duration-200 ${
                          image === img
                            ? " border-button-color bg-white"
                            : " border-neutral-200"
                        } ${image === img ? "opacity-100" : "opacity-50"}`}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-error cursor-pointer"
                        onClick={() => {
                          deleteImage({ id: img })
                            .then(() => {
                              dispatch(
                                setSelectedItem({
                                  ...selectedItem,
                                  images: selectedItem.images.filter(
                                    (i) => i !== img
                                  ),
                                })
                              );
                            })
                            .catch((err) => {
                              toast.error("Failed to delete image");
                            });
                        }}
                      />
                    </div>
                  ))}
                  <div>
                    {!uploadingImage && !updatingImages ? (
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                          <input
                            onChange={(e) => {
                              if (!e.target.files?.length) return;

                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);

                              uploadImageMutation(formData)
                                .unwrap()
                                .then((res) => {
                                  updateImages({
                                    images: [...selectedItem.images, res.id],
                                    itemId: selectedItem.id,
                                  })
                                    .then(() => {
                                      dispatch(
                                        setSelectedItem({
                                          ...selectedItem,
                                          images: [
                                            ...selectedItem.images,
                                            res.id,
                                          ],
                                        })
                                      );
                                    })
                                    .catch((err) => {
                                      deleteImage({ id: res.id });
                                    });
                                });
                            }}
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                          />
                        </label>
                      </div>
                    ) : (
                      <SeLoader size={12} />
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full space-y-4 pt-12">
                <SeEditInput
                  className="text-4xl font-bold text-primary"
                  defaultValue={selectedItem.name}
                  onChange={(e) => {
                    dispatch(setSelectedItem({ ...selectedItem, name: e }));
                  }}
                />
                <SeEditInput
                  className="text-button-color text-3xl font-bold"
                  defaultValue={selectedItem.price}
                  type="number"
                  onChange={(e) => {
                    dispatch(
                      setSelectedItem({ ...selectedItem, price: Number(e) })
                    );
                  }}
                  extraCharachters="$"
                />

                <div>
                  <p className="text-primary">Description</p>

                  <SeEditInput
                    defaultValue={selectedItem.description}
                    onChange={(e) => {
                      dispatch(
                        setSelectedItem({ ...selectedItem, description: e })
                      );
                    }}
                    className="text-sm text-sub-title-text"
                  />
                </div>
                {/* Iterate over item options and pass them to SeToggleButtonGroup */}
                {selectedItem.options.map((opt, index) => {
                  return (
                    <div key={index}>
                      <div className="flex items-center gap-2">
                        <p>{opt.name}</p>
                        <FontAwesomeIcon
                          icon={faPen}
                          className="text-primary cursor-pointer text-sm"
                          onClick={() => {
                            setOnlineOptions((prev) => {
                              return [...prev, opt.name];
                            });
                            setOpt((prev) => {
                              return [
                                ...prev,
                                {
                                  id: Math.random(),
                                  name: opt.name,
                                  options: opt.options,
                                },
                              ];
                            });
                            dispatch(
                              setSelectedItem({
                                ...selectedItem,
                                options: selectedItem.options.filter(
                                  (o) => o.name !== opt.name
                                ),
                              })
                            );
                            setAddOption(false);
                          }}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-error cursor-pointer text-sm"
                          onClick={() => {
                            dispatch(
                              setSelectedItem({
                                ...selectedItem,
                                options: selectedItem.options.filter(
                                  (o) => o.name !== opt.name
                                ),
                              })
                            );
                            setAddOption(false);
                          }}
                        />
                      </div>
                      <SeToggleButtonGroup
                        options={opt.options}
                        selectedOption={
                          selectedOptions.find((o) => o.key === opt.name)
                            ?.value || ""
                        }
                        setSelectedOption={(value: string) => {
                          console.log(value);
                          handleOptionChange(opt.name, value);
                        }}
                      />
                    </div>
                  );
                })}
                {opt.length
                  ? opt.map((opti, index) => {
                      return (
                        <div key={index}>
                          <SeTextField
                            placeholder={`Option Name`}
                            className="mb-2"
                            value={opti.name}
                            onChange={(e) => {
                              setOpt((prev) => {
                                return prev.map((o) => {
                                  if (o.id === opti.id) {
                                    return { ...o, name: e.target.value };
                                  }
                                  return o;
                                });
                              });
                            }}
                          />
                          <div className="flex items-center gap-2 flex-wrap ">
                            {opti.options.map((o, i) => {
                              return (
                                <SeTextField
                                  trailingIcon={
                                    <FontAwesomeIcon
                                      className="text-error cursor-pointer"
                                      icon={faTrash}
                                      onClick={() => {
                                        setOpt((prev) => {
                                          return prev.map((op) => {
                                            if (op.id === opti.id) {
                                              return {
                                                ...op,
                                                options: op.options.filter(
                                                  (op, ind) => ind !== i
                                                ),
                                              };
                                            }
                                            return op;
                                          });
                                        });
                                      }}
                                    />
                                  }
                                  value={o}
                                  placeholder="Option Value"
                                  sx={{
                                    maxWidth: "25%",
                                  }}
                                  key={i}
                                  onChange={(e) => {
                                    setOpt((prev) => {
                                      return prev.map((op) => {
                                        if (op.id === opti.id) {
                                          return {
                                            ...op,
                                            options: op.options.map(
                                              (op, ind) => {
                                                if (ind === i) {
                                                  return e.target.value;
                                                }
                                                return op;
                                              }
                                            ),
                                          };
                                        }
                                        return op;
                                      });
                                    });
                                  }}
                                />
                              );
                            })}
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="text-primary cursor-pointer"
                              onClick={() => {
                                setOpt((prev) => {
                                  return prev.map((o) => {
                                    if (o.id === opti.id) {
                                      return {
                                        ...o,
                                        options: [...o.options, ""],
                                      };
                                    }
                                    return o;
                                  });
                                });
                                setAddOption(true);
                              }}
                            />
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <SeButton
                              label={"Submit Option"}
                              variant="contained"
                              color="error"
                              onClick={() => {
                                //remove the option from the list
                                // add the option to the item
                                dispatch(
                                  setSelectedItem({
                                    ...selectedItem,
                                    options: [
                                      ...selectedItem.options,
                                      {
                                        name: opti.name,
                                        options: opti.options,
                                      },
                                    ],
                                  })
                                );
                                setOpt((prev) => {
                                  return prev.filter((o) => o.id !== opti.id);
                                });
                                setAddOption(false);
                              }}
                            />
                            <SeButton
                              label={"Cancel"}
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                if (onlineOptions.includes(opti.name)) {
                                  dispatch(
                                    setSelectedItem({
                                      ...selectedItem,
                                      options: [
                                        ...selectedItem.options,
                                        {
                                          name: opti.name,
                                          options: opti.options,
                                        },
                                      ],
                                    })
                                  );
                                }
                                setOpt((prev) => {
                                  return prev.filter((o) => o.id !== opti.id);
                                });
                                setAddOption(false);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  : null}
                {!addOption ? (
                  <div className="flex items-center justify-start max-w-40">
                    <SeButton
                      className="w-full"
                      onClick={() => {
                        setAddOption(true);
                        setOpt((prev) => {
                          return [
                            ...prev,
                            {
                              id: Math.random(),
                              name: `Option Name ${prev.length + 1}`,
                              options: ["option"],
                            },
                          ];
                        });
                      }}
                      label={"Add Option"}
                      variant="contained"
                      fullWidth={true}
                      color="error"
                    />
                  </div>
                ) : null}
                <p className="flex items-center">
                  Stock Available:
                  <SeEditInput
                    defaultValue={selectedItem.stock}
                    onChange={(e) => {
                      dispatch(
                        setSelectedItem({ ...selectedItem, stock: Number(e) })
                      );
                    }}
                    type="number"
                  />
                </p>
              </div>
            </div>
            <div className="flex center justify-end">
              <SeButton
                label="Save Changes"
                color_custom="admin-primary"
                variant="contained"
                onClick={() => {
                  const toastId = toast.loading("Saving changes...");
                  saveChanges({
                    data: {
                      description: selectedItem.description,
                      name: selectedItem.name,
                      price: selectedItem.price,
                      stock: selectedItem.stock,
                      images: selectedItem.images,
                      options: selectedItem.options,
                    },
                    itemId: selectedItem.id,
                    storeId: store as string,
                    name: debouncedSearch,
                    page,
                    limit,
                  })
                    .then(() => {
                      toast.dismiss(toastId);
                      toast.success("Changes saved successfully");
                      dispatch(setSelectedItem(null));
                    })
                    .catch((err) => {
                      toast.dismiss(toastId);
                      toast.error("Failed to save changes");
                    });
                }}
              />
            </div>
          </div>
        </SeDialog>
      )}
    </>
  );
}

export default EditItemDialog;
