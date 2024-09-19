import LinkArrowAnimation from "@/components/global/link-arrow-animation";
import SeEditInput from "@/components/global/SeEditInput";
import SeTextField from "@/components/global/SeTextField";
import { getImageById } from "@/hooks/getImageById";
import { useAppSelector } from "@/providers/StoreWrapper";
import {
  faCheck,
  faPen,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useUpdateSideBoxMutation } from "../../../../redux/rtk";
import { EditSideBoxDto } from "../../../../interfaces/edit-side-box.dto";

function SideBoxEdit({
  handleChange,
}: {
  handleChange: (data: EditSideBoxDto) => void;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const { editSideBox } = useAppSelector((state) => state.AdminLandingPageEdit);
  useEffect(() => {
    if (typeof editSideBox?.backgroundImage === "string") {
      getImageById(editSideBox?.backgroundImage, (base64data) => {
        if (base64data) {
          setImageSrc(base64data); // Set the image data in the state when ready
        }
      });
    }
  }, [editSideBox]);
  const dispatch = useDispatch();
  const [editLink, setEditLink] = useState(false);
  const [text1, setText1] = useState(editSideBox?.text1 || "Text 1");
  const [text2, setText2] = useState(editSideBox?.text2 || "Text 2");
  const [text3, setText3] = useState(editSideBox?.text3 || "Text 3");
  const [linkTitle, setLinkTitle] = useState(
    editSideBox?.link.title || "Link Title"
  );
  const [linkTarget, setLinkTarget] = useState(
    editSideBox?.link.target || "Link Target"
  );
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updateSideBox, { isLoading: updateSideBoxLoading }] =
    useUpdateSideBoxMutation();

  useEffect(() => {
    handleChange({
      image: newImage,
      imageId: editSideBox?.backgroundImage || "",
      text1,
      text2,
      text3,
      linkText: linkTitle,
      linkTarget,
    });
  }, [newImage, text1, text2, text3, linkTitle, linkTarget]);

  return (
    <div
      className="bg-neutral-300 h-full flex flex-col justify-center pl-4 relative min-h-80"
      style={{
        backgroundImage: `url('${
          newImage ? URL.createObjectURL(newImage) : imageSrc
        }')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full  rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="absolute top-4 right-4 bg-primary h-10 w-10 rounded-md flex items-center justify-center cursor-pointer">
            <FontAwesomeIcon icon={faPen} className="text-xl text-white" />
          </div>
          <input
            onChange={(e) => {
              if (!e.target.files?.length) return;

              setNewImage(e.target.files[0]);
            }}
            id="dropzone-file"
            type="file"
            accept="image/*"
            className="hidden"
          />
        </label>
      </div>
      <p className="text-base font-light">
        <SeEditInput
          defaultValue={text1}
          onChange={(e) => {
            setText1(e as string);
          }}
        />
      </p>
      <p className="font-semibold text-xl">
        <SeEditInput
          defaultValue={text2}
          onChange={(e) => {
            setText2(e as string);
          }}
        />
      </p>
      <p className="font-semibold text-xl">
        <SeEditInput
          defaultValue={text3}
          onChange={(e) => {
            setText3(e as string);
          }}
        />
      </p>
      {!editLink ? (
        <div className="flex items-center gap-2">
          <LinkArrowAnimation text={linkTitle} target={linkTarget} />
          <FontAwesomeIcon
            icon={faPen}
            className="text-sm text-primary cursor-pointer"
            onClick={() => {
              setEditLink(true);
            }}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {" "}
          <div className="max-w-60 bg-white">
            <SeTextField
              defaultValue={editSideBox?.link.title}
              onChange={(e) => {
                setLinkTitle(e.target.value);
              }}
            />
            <SeTextField
              defaultValue={editSideBox?.link.target}
              onChange={(e) => {
                setLinkTarget(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-2 flex-col">
            <FontAwesomeIcon
              icon={faCheck}
              className="text-sm text-primary cursor-pointer"
              onClick={() => {
                setEditLink(false);
              }}
            />
            <FontAwesomeIcon
              icon={faX}
              className="text-sm cursor-pointer"
              onClick={() => {
                setEditLink(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBoxEdit;
