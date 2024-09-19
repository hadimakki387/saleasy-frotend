import SeDialog from "@/components/global/SeDialog";
import { useAppSelector } from "@/providers/StoreWrapper";
import React from "react";
import SideHeroBoxAdmin from "../../SideHeroBoxAdmin";
import { useDispatch } from "react-redux";
import {
  setEditSideBox,
  setSelectedHeroCarousel,
} from "../../../../redux/redux";
import SideBoxEdit from "./SidebarBoxEdit";
import { useUpdateSideBoxMutation } from "../../../../redux/rtk";
import { sideBoxInterface } from "@/core/features/customer/landing/interfaces/link-interface";
import { EditSideBoxDto } from "../../../../interfaces/edit-side-box.dto";
import { toast } from "sonner";

type Props = {};

function EditBoxCarousel({}: Props) {
  const { editSideBox } = useAppSelector((state) => state.AdminLandingPageEdit);
  const dispatch = useDispatch();
  const [sideBoxData, setSideBoxData] = React.useState<EditSideBoxDto>();
  const [updateSideBox, { isLoading: updateSideBoxLoading }] =
    useUpdateSideBoxMutation();
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);

  return (
    <SeDialog
      open={editSideBox ? true : false}
      onOk={() => {
        if (!sideBoxData?.image && !sideBoxData?.imageId) {
          toast.error("Please select an image");
          return;
        }
        const formData = new FormData();
        if (sideBoxData?.image) {
          formData.append("image", sideBoxData.image);
        }
        formData.append("text1", sideBoxData.text1);
        formData.append("text2", sideBoxData.text2);
        formData.append("text3", sideBoxData.text3);
        formData.append("linkText", sideBoxData.linkText);
        formData.append("linkTarget", sideBoxData.linkTarget);
        formData.append("imageId", sideBoxData.imageId || "");
        const toastId = toast.loading("Updating side box...");
        updateSideBox({
          item: formData,
          sideboxItem: editSideBox?.id || "",
          linkId: store?.link.id || "",
          storeId: store?.id || "",
        })
          .unwrap()
          .then(() => {
            dispatch(setEditSideBox(null));
            toast.dismiss(toastId);
            toast.success("Side box updated successfully");
          })
          .catch(() => {
            toast.dismiss(toastId);
            toast.error("Failed to update side box");
          });
      }}
      onClose={() => {
        dispatch(setEditSideBox(null));
      }}
    >
      <SideBoxEdit
        handleChange={(e) => {
          setSideBoxData(e);
        }}
      />
    </SeDialog>
  );
}

export default EditBoxCarousel;
