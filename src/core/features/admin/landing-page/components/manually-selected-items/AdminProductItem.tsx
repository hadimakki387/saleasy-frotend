import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import CustomImage from "@/components/global/CustomImage";
import SeProductInfo from "@/core/features/customer/landing/components/SeProductInfo";
import { useRemoveManuallySelectedItemMutation } from "../../redux/rtk";
import { toast } from "sonner";
import { useAppSelector } from "@/providers/StoreWrapper";

interface ProductCardProps {
  imageSrc: string;
  title: string;
  price: number;
  rating: number;
  id: string;
}

const StarIcon = () => <span className="text-yellow-400 mr-1">★</span>;

const AdminProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  title,
  price,
  rating,
  id,
}) => {
  const [liked, setLiked] = useState(false);
  const [showProductInfo, setShowProductInfo] = useState(false);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowProductInfo(true);
  };

  const handleCloseProductInfo = () => {
    setShowProductInfo(false);
  };
  const router = useRouter();
  const param = useParams();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);

  const [
    removeManuallySelectedItem,
    { isLoading: removeManuallySelectedItemLoading },
  ] = useRemoveManuallySelectedItemMutation();

  return (
    <>
      <SeCard className="relative bg-white rounded-lg shadow-md p-4 flex flex-col items-center w-full min-w-[300px] max-w-[300px] h-[400px] justify-between border-2 border-transparent hover:border-[var(--primary)] transition-all group max-sm:min-w-[170px] max-sm:max-w-[170px] max-sm:h-[250px] ">
        <div className="absolute top-4 right-4  flex space-x-4">
          <FontAwesomeIcon
            icon={faTrashCan}
            className="text-red-500 text-lg cursor-pointer z-50"
            onClick={() => {
              const toastId = toast.loading(
                "Removing item from manually selected items"
              );

              removeManuallySelectedItem({
                storeId: store?.id as string,
                itemId: id,
                linkId: store?.link?.id as string,
                sectionId: store?.link?.sections.find(
                  (section) => section.type === "manually_selected"
                )?.id as string,
              })
                .unwrap()
                .then(() => {
                  toast.dismiss(toastId);
                  toast.success("Item removed successfully");
                })
                .catch(() => {
                  toast.dismiss(toastId);
                  toast.error("An error occurred while removing item");
                });
            }}
          />
        </div>
        <CustomImage
          size={100}
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4 max-sm:h-32"
        />
        <h2 className="text-[var(--title-text)] text-sm font-semibold mb-2 text-center truncate">
          {title}
        </h2>
        <p className="text-gray-900 font-bold text-sm mb-2 text-center">
          ${price}
        </p>

        <SeButton
          fullWidth
          label={"Add To Cart"}
          variant="outlined"
          color="primary"
          onClick={() => {}}
        />
      </SeCard>

      {showProductInfo && (
        <SeProductInfo
          imageSrc={imageSrc}
          title={title}
          price={price}
          rating={rating}
          onClose={handleCloseProductInfo}
        />
      )}
    </>
  );
};

export default AdminProductCard;
