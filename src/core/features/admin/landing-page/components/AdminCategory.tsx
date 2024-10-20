import SeButton from "@/components/global/SeButton";
import SeCard from "@/components/global/SeCard";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getImageById } from "@/hooks/getImageById";
import { useRouter } from "nextjs-toploader/app";
import CustomImage from "@/components/global/CustomImage";
import { ICategories } from "@/core/features/customer/landing/interfaces/category-interface";

type Props = {
  product: ICategories;
};

function AdminCategory({ product }: Props) {
  const router = useRouter();
  const { store } = useParams();
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    getImageById(product.image, (base64data) => {
      if (base64data) {
        setImageSrc(base64data); // Set the image data in the state when ready
      }
    });
  }, [product.image]);
  return (
    <SeCard>
      <CustomImage
        size={100}
        src={imageSrc || ""}
        alt={product.name}
        className=" object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110 min-w-56 max-sm:min-w-h-32 max-w-56 h-56 max-sm:h-32 max-sm:max-w-32 max-sm:min-w-32"
      />

      <SeButton
        fullWidth
        variant="outlined"
        color="primary"
        label={product.name}
        onClick={() =>
          router.push(`/${store}/search?category=${product.id}`)
        }
      />
    </SeCard>
  );
}

export default AdminCategory;
