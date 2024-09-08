import { getImageById } from "@/hooks/getImageById";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import DaLoader from "./SeLoader";

interface Props extends React.ComponentPropsWithoutRef<typeof Image> {
  size?: number;
  className?: string;
  alt: string;
}

function CustomImage({ src, className, size, alt }: Props) {
  const [imageSrc, setImageSrc] = useState<string | StaticImport | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (src.toString().includes("/")) {
      console.log("src", src);
      setImageSrc(src);
      setLoading(false);
      return;
    }
    if (typeof src === "string") {
      getImageById(src, (base64data) => {
        if (base64data) {
          setImageSrc(base64data); // Set the image data in the state when ready
          setLoading(false);
        }
      }).catch((e) => {
        setImageSrc(src);
        setLoading(false);
      });
    }
  }, [src]);
  return (
    <>
      {!loading ? (
        <Image
          height={size || 1000}
          width={size || 1000}
          src={imageSrc || ""}
          alt={alt}
          className={twMerge(className)}
        />
      ) : (
        <div
          className={twMerge(className, " flex items-center justify-center")}
        >
          <DaLoader color="error" />
        </div>
      )}
    </>
  );
}

export default CustomImage;
