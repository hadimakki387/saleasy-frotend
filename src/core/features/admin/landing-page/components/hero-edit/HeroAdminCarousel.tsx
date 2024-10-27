import SeButton from "@/components/global/SeButton";
import { getImageById } from "@/hooks/getImageById";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedHeroCarousel } from "../../redux/redux";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useRemoveCarouselItemMutation } from "../../redux/rtk";
import { toast } from "sonner";

type Props = {
  data: {
    id: string;
    text1: string;
    text2: string;
    text3: string;
    text4: string;
    backgroundImage: string;
    link: {
      title: string;
      target: string;
    };
  };
  currentIndex: number;
};

function HeroAdminCarousel({ data, currentIndex }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    getImageById(data.backgroundImage, (base64data) => {
      if (base64data) {
        setImageSrc(base64data); // Set the image data in the state when ready
      }
    });
  }, [data.backgroundImage]);
  const router = useRouter();
  const dispatch = useDispatch();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const [removeCarouselItem, { isLoading: removeCarouselItemLoading }] =
    useRemoveCarouselItemMutation();

  return (
    <div className="item-nkw  min-w-full relative">
      <div
        className="relative overflow-hidden min-h-[60vh] max-md:min-h-[35vh] "
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-4 right-4 flex items-center gap-4">
          {" "}
          <div
            className=" bg-admin-primary h-10 w-10 rounded-md flex items-center justify-center cursor-pointer z-50"
            onClick={() => {
              dispatch(
                setSelectedHeroCarousel({
                  ...data,
                  carouselItemIndex: currentIndex,
                })
              );
            }}
          >
            <FontAwesomeIcon icon={faPen} className="text-xl text-white" />
          </div>
          <div
            className=" bg-slate-300 h-10 w-10 rounded-md flex items-center justify-center cursor-pointer z-50"
            onClick={() => {
              const toastId = toast.loading("Removing carousel item...");
              removeCarouselItem({
                itemId: data.id,
                linkId: store?.link.id || "",
                storeId: store?.id || "",
              })
                .unwrap()
                .then(() => {
                  toast.dismiss(toastId);
                  toast.success("Carousel item removed successfully");
                })
                .catch(() => {
                  toast.dismiss(toastId);
                  toast.error("Failed to remove carousel item");
                });
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="text-xl text-error" />
          </div>
        </div>

        <div className="absolute top-0 left-8 z-10 h-full flex flex-col justify-center space-y-4 max-sm:space-y-2">
          <p className="text-3xl font-light tracking-wider max-sm:text-xl">
            {data.text1}
          </p>
          <h4 className="text-6xl font-semibold  leading-none max-sm:text-3xl">
            {data.text2}
          </h4>
          <p className="font-medium text-3xl max-sm:text-xl">
            {data.text3} <span className=" text-red-500">{data.text4}</span>
          </p>
          <SeButton
            className="w-1/2"
            label="SHOP NOW"
            color="primary"
            variant="contained"
            onClick={() => {
              router.push(data.link.target);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroAdminCarousel;
