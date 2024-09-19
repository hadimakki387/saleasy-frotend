import { getImageById } from "@/hooks/getImageById";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { twMerge } from "tailwind-merge";
import DaLoader from "./SeLoader";
import { Skeleton } from "@mui/material";

interface Props extends React.ComponentPropsWithoutRef<typeof Image> {
  size?: number;
  className?: string;
  alt: string;
  stateImage?: File | null;
}

// Create a cache object
const imageCache: { [key: string]: string | StaticImport } = {};

function CustomImage({
  src,
  className,
  size,
  alt,
  onClick,
  stateImage,
}: Props) {
  const [imageSrc, setImageSrc] = useState<string | StaticImport | null>(null);
  const [loading, setLoading] = useState(true);
  const prevSrc = useRef<string | StaticImport | null>(null); // To keep track of the previous src

  useEffect(() => {
    if (src) {
      // Prevent re-fetching if src is the same as before
      if (prevSrc.current === src) return;

      prevSrc.current = src;

      if (src && src.toString().includes("/")) {
        setImageSrc(src);
        setLoading(false);
        return;
      }

      // Check if the image is already cached
      if (imageCache[src as string]) {
        setImageSrc(imageCache[src as string]);
        setLoading(false);
        return;
      }

      // Fetch the image if it's not in the cache
      if (typeof src === "string") {
        getImageById(src, (base64data) => {
          if (base64data) {
            imageCache[src] = base64data; // Cache the result
            setImageSrc(base64data); // Set the image data in the state when ready
            setLoading(false);
          }
        }).catch((e) => {
          setImageSrc(src);
          setLoading(false);
        });
      }
    } else {
      setLoading(false);
    }
  }, [src]);
  console.log("loading", loading);

  return (
    <>
      {!loading ? (
        stateImage ? (
          <Image
            src={URL.createObjectURL(stateImage)}
            alt={alt}
            height={size || 1000}
            width={size || 1000}
            className={twMerge(className)}
          />
        ) : (
          <Image
            height={size || 1000}
            width={size || 1000}
            src={imageSrc || ""}
            alt={alt}
            className={twMerge(className)}
            onClick={(e) => {
              if (onClick) onClick(e);
            }}
          />
        )
      ) : className ? (
        <div
          className={twMerge(
            " flex items-center justify-center h-full w-full",
            className
          )}
        >
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </div>
      ) : (
        <div
          style={{
            height: size,
            width: size,
          }}
        >
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </div>
      )}
    </>
  );
}

// Use React.memo to memoize the component and avoid re-renders unless the `src` changes
export default React.memo(CustomImage);
