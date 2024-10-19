import { useAppDispatch, useAppSelector } from "@/providers/StoreWrapper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminExtendedApi, useUpdateLinkColorsMutation } from "../redux/rtk";
import SeButton from "@/components/global/SeButton";
import { ILinkEntity } from "@/core/features/customer/landing/interfaces/link-interface";
import { toast } from "sonner";

type Props = {
  link: ILinkEntity;
};

function ThemeColorPicker({ link }: Props) {
  const [primaryColor, setPrimaryColor] = useState(
    link.link.theme.colors.primary
  );
  const [secondaryColor, setSecondaryColor] = useState(
    link.link.theme.colors.error
  );
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(primaryColor, secondaryColor);

      window.document.documentElement.style.setProperty(
        "--primary",
        primaryColor
      );
      window.document.documentElement.style.setProperty(
        "--error",
        secondaryColor
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [primaryColor, secondaryColor]);

  const [
    updateLinkColors,
    { data: updateLinkColorsData, error: updateLinkColorsError },
  ] = useUpdateLinkColorsMutation();

  const isChanged1 =
    link.link.theme.colors.primary !== "#2b3445" ||
    link.link.theme.colors.error !== "#d23f57";
  const isChanged2 = primaryColor !== "#2b3445" || secondaryColor !== "#d23f57";

  return (
    <div>
      <div className="flex items-center gap-4">
        <p>Primary Color</p>
        <input
          type="color"
          className="p-1 h-10 w-14 block bg-white  cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none "
          id="hs-color-input"
          value={primaryColor}
          title="Choose your color"
          onChange={(e) => {
            setPrimaryColor(e.target.value);
          }}
          disabled={!edit}
        />
      </div>
      <div className="flex items-center gap-4">
        <p>Secondary Color</p>
        <input
          type="color"
          className="p-1 h-10 w-14 block bg-white  cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none "
          id="hs-color-input"
          value={secondaryColor}
          title="Choose your color"
          onChange={(e) => {
            setSecondaryColor(e.target.value);
          }}
          disabled={!edit}
        />
      </div>
      <div className="flex items-center gap-4">
        <SeButton
          label={edit ? "Save" : "Edit"}
          variant="contained"
          onClick={() => {
            if (!edit) {
              setEdit(true);
              return;
            }
            if (
              edit &&
              (primaryColor !== link.link.theme.colors.primary ||
                secondaryColor !== link.link.theme.colors.secondary)
            ) {
              const toastId = toast.loading("Updating colors...");
              updateLinkColors({
                storeId: store?.id as string,
                colors: {
                  primary: primaryColor,
                  error: secondaryColor,
                },
              })
                .unwrap()
                .then(() => {
                  setEdit(false);
                  toast.dismiss(toastId);
                  toast.success("Colors updated successfully");
                })
                .catch((error) => {
                  toast.dismiss(toastId);
                  toast.error("Failed to update colors");
                });
            }
          }}
          color_custom="admin-primary"
        />
        {edit && (
          <SeButton
            label="Reset"
            variant="contained"
            onClick={() => {
              window.document.documentElement.style.setProperty(
                "--primary",
                link.link.theme.colors.primary
              );
              window.document.documentElement.style.setProperty(
                "--error",
                link.link.theme.colors.error
              );
              setPrimaryColor(link.link.theme.colors.primary);
              setSecondaryColor(link.link.theme.colors.error);
              setEdit(false);
            }}
            color_custom="admin-primary"
          />
        )}
        {isChanged1 && isChanged2 && edit && (
          <SeButton
            label={"default"}
            onClick={() => {
              window.document.documentElement.style.setProperty(
                "--primary",
                "#2b3445"
              );
              window.document.documentElement.style.setProperty(
                "--error",
                "#d23f57"
              );
              setPrimaryColor("#2b3445");
              setSecondaryColor("#d23f57");
            }}
            color_custom="admin-primary"
            variant="contained"
          />
        )}
      </div>
    </div>
  );
}

export default ThemeColorPicker;
