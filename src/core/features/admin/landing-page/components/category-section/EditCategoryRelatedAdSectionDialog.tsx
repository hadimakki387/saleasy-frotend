import SeButton from "@/components/global/SeButton";
import SeDialog from "@/components/global/SeDialog";
import SeEditInput from "@/components/global/SeEditInput";
import { getImageById } from "@/hooks/getImageById";
import { useAppSelector } from "@/providers/StoreWrapper";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setCategoryRelatedItemsAdvertismentSection } from "../../redux/redux";
import { useEditCarouselItemMutation } from "../../redux/rtk";
import { useUpdateCategoriesRelatedAdvertismentSectionMutation } from "./redux/rtk";

type Props = {
  fullBanner?: boolean;
};

function EditCategoryRelatedAdSectionDialog({ fullBanner }: Props) {
  const { categoryRelatedItemsAdvertismentSection } = useAppSelector(
    (state) => state.AdminLandingPageEdit
  );

  const dispatch = useDispatch();
  const [editCarousel, { isLoading: editCarouselLoading }] =
    useEditCarouselItemMutation();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    if (categoryRelatedItemsAdvertismentSection)
      getImageById(
        categoryRelatedItemsAdvertismentSection.backgroundImage,
        (base64data) => {
          if (base64data) {
            setImageSrc(base64data); // Set the image data in the state when ready
          }
        }
      );
  }, [categoryRelatedItemsAdvertismentSection]);
  const [image, setImage] = useState<File | null>(null);
  const [text1, setText1] = useState(
    categoryRelatedItemsAdvertismentSection?.text1
  );
  const [text2, setText2] = useState(
    categoryRelatedItemsAdvertismentSection?.text2
  );
  const [redText, setRedText] = useState(
    categoryRelatedItemsAdvertismentSection?.redText
  );
  const [linkTitle, setLinkTitle] = useState(
    categoryRelatedItemsAdvertismentSection?.link.title
  );
  const [linkTarget, setLinkTarget] = useState(
    categoryRelatedItemsAdvertismentSection?.link.target
  );
  useEffect(() => {
    setText1(categoryRelatedItemsAdvertismentSection?.text1);
    setText2(categoryRelatedItemsAdvertismentSection?.text2);
    setRedText(categoryRelatedItemsAdvertismentSection?.redText);
    setLinkTitle(categoryRelatedItemsAdvertismentSection?.link.title);
    setLinkTarget(categoryRelatedItemsAdvertismentSection?.link.target);
  }, [categoryRelatedItemsAdvertismentSection]);

  const [
    editAdvertisementSection,
    { isLoading: editAdvertisementSectionLoading },
  ] = useUpdateCategoriesRelatedAdvertismentSectionMutation();
  console.log(categoryRelatedItemsAdvertismentSection);
  return (
    <SeDialog
      open={categoryRelatedItemsAdvertismentSection ? true : false}
      maxWidth={!fullBanner ? "lg" : "sm"}
      onClose={() => {
        dispatch(setCategoryRelatedItemsAdvertismentSection(null));
      }}
      onOk={() => {
        if (
          !image &&
          !categoryRelatedItemsAdvertismentSection?.backgroundImage
        ) {
          toast.error("Please select an image");
          return;
        }
        const formData = new FormData();
        if (image) {
          formData.append("image", image);
        }
        formData.append("text1", text1 || "");
        formData.append("text2", text2 || "");
        formData.append("redText", redText || "");
        formData.append("linkTitle", linkTitle || "");
        formData.append("linkTarget", linkTarget || "");
        formData.append(
          "imageId",
          categoryRelatedItemsAdvertismentSection?.backgroundImage || ""
        );

        const toastId = toast.loading("Updating carousel item...");
        editAdvertisementSection({
          advertismentId: categoryRelatedItemsAdvertismentSection?.id || "",
          sectionId: categoryRelatedItemsAdvertismentSection?.sectionId || "",
          item: formData,
          linkId: store?.link.id || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setCategoryRelatedItemsAdvertismentSection(null));
            toast.dismiss(toastId);
            toast.success("Carousel item updated successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Failed to update carousel item");
          });
      }}
    >
      {categoryRelatedItemsAdvertismentSection && (
        <div className="item-nkw  w-full relative">
          <div className="absolute top-4 right-4 z-50 flex gap-4">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <FontAwesomeIcon icon={faPen} />
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
          </div>
          <div className="md:hidden">
            <div
              className="relative overflow-hidden h-[13rem]"
              style={{
                backgroundImage: image
                  ? `url('${URL.createObjectURL(image)}')`
                  : `url('${imageSrc}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center">
                <p className="text-xs font-light tracking-wider">
                  <SeEditInput
                    defaultValue={text1 as string}
                    onChange={(e) => {
                      setText1(e as string);
                    }}
                  />
                </p>
                <h4 className="text-lg font-semibold my-4 leading-none">
                  <SeEditInput
                    defaultValue={text2 as string}
                    onChange={(e) => {
                      setText2(e as string);
                    }}
                  />
                  <br />
                  <span className="font-light text-red-500">
                    <SeEditInput
                      defaultValue={redText as string}
                      onChange={(e) => {
                        setRedText(e as string);
                      }}
                    />
                  </span>
                </h4>
                <a
                  href={linkTarget}
                  className="text-gray-800 font-semibold inline-flex items-center relative pb-1 hover:text-gray-800"
                >
                  {linkTitle}
                  <svg
                    className="w-4 h-4 inline-block fill-current ml-2 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="max-md:hidden">
            {fullBanner ? (
              <div
                className="relative overflow-hidden h-[13rem]"
                style={{
                  backgroundImage: image
                    ? `url('${URL.createObjectURL(image)}')`
                    : `url('${imageSrc}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center">
                  <p className="text-xs font-light tracking-wider">
                    <SeEditInput
                      defaultValue={text1 as string}
                      onChange={(e) => {
                        setText1(e as string);
                      }}
                    />
                  </p>
                  <h4 className="text-lg font-semibold my-4 leading-none">
                    <SeEditInput
                      defaultValue={text2 as string}
                      onChange={(e) => {
                        setText2(e as string);
                      }}
                    />
                    <br />
                    <span className="font-light text-red-500">
                      <SeEditInput
                        defaultValue={redText as string}
                        onChange={(e) => {
                          setRedText(e as string);
                        }}
                      />
                    </span>
                  </h4>
                  <a
                    href={linkTarget}
                    className="text-gray-800 font-semibold inline-flex items-center relative pb-1 hover:text-gray-800"
                  >
                    {linkTitle}
                    <svg
                      className="w-4 h-4 inline-block fill-current ml-2 transition-transform"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
                    </svg>
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="relative overflow-hidden h-[13rem]"
                  style={{
                    backgroundImage: image
                      ? `url('${URL.createObjectURL(image)}')`
                      : `url('${imageSrc}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="flex items-center justify-center gap-1 text-4xl font-[800] text-primary h-full">
                    <p className=" tracking-wider">
                      <SeEditInput
                        defaultValue={text1 as string}
                        onChange={(e) => {
                          setText1(e as string);
                        }}
                      />
                    </p>
                    <h4 className="  my-4 leading-none text-error">
                      <SeEditInput
                        defaultValue={text2 as string}
                        onChange={(e) => {
                          setText2(e as string);
                        }}
                      />
                    </h4>
                    <span className="">
                      <SeEditInput
                        defaultValue={redText as string}
                        onChange={(e) => {
                          setRedText(e as string);
                        }}
                      />
                    </span>
                  </div>
                  <div className="absolute right-4 top-4 bottom-4  flex items-center">
                    <SeButton
                      label={linkTitle}
                      variant="outlined"
                      color="primary"
                      sx={{
                        padding: "0.75rem 3rem",
                        fontSize: "1rem",
                        textTransform: "none",
                      }}
                      noBorder
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </SeDialog>
  );
}

export default EditCategoryRelatedAdSectionDialog;
