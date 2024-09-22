import { ReactNode } from "react";

import { ChipType } from "./constants";
import { IconButton, Tooltip } from "@mui/material";
import SeChip from "@/components/global/Chip/SE-Chip";
import SeButton from "@/components/global/SeButton";
import SePopover from "@/components/global/Popover/SE-Popover";
import { More } from "@mui/icons-material";
import SeCheckbox from "@/components/global/SeCheckbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import CustomImage from "@/components/global/CustomImage";
import Image from "next/image";

export type getChipProps = {
  values?: {
    key: string;
    value: string;
    chipType: ChipType;
  }[];
  params: any;
  className?: string;
};

export const getChips = ({
  values = [
    {
      key: "Active",
      value: "Active",
      chipType: ChipType.success,
    },
    {
      key: "Pending",
      value: "Pending",
      chipType: ChipType.info,
    },
    {
      key: "Confirmed",
      value: "Confirmed",
      chipType: ChipType.default,
    },
  ],
  params,
  className,
}: getChipProps) => {
  const value = params?.value;
  console.log("thissi the value");
  console.log(params);
  const chip = values.find((v) => v.key === value);
  if (chip) {
    return (
      <SeChip type={chip.chipType} label={chip.value} className={className} />
    );
  } else {
    return (
      <SeChip type={ChipType.default} label={value} className={className} />
    );
  }
};

export const getAction = ({
  label,
  params,
  onActionClick,
  className,
  sx,
}: {
  label: string;
  params: any;
  onActionClick?: (rowID: any, colID: any) => void;
  className?: string;
  sx?: Record<string, any>;
}) => {
  return (
    <SeButton
      className={`${className}`}
      sx={{
        p: "4px 8px",
        fontSize: "12px",
        ...sx,
      }}
      label={label}
      variant="contained"
      onClick={(e) => {
        e.stopPropagation();
        onActionClick && onActionClick(params.row.id, params.colDef.field);
      }}
    />
  );
};

export const getActionButtons = ({
  onActionClick,
  params,
  buttons,
}: {
  params: any;
  onActionClick?: (rowID: any, colID: any) => void;
  buttons: {
    icon: ReactNode;
    id: string;
    title?: string;
  }[];
}) => {
  return (
    <div className="flex gap-3 items-center justify-center">
      {buttons?.map((button) =>
        button.id === "toolbar" ? (
          <Tooltip key={button.id} title={button.title}>
            <IconButton
              onClick={() =>
                onActionClick && onActionClick(params.row.id, button.id)
              }
            >
              {button.icon}
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton
            key={button.id}
            onClick={() =>
              onActionClick && onActionClick(params.row.id, button.id)
            }
          >
            {button.icon}
          </IconButton>
        )
      )}
    </div>
  );
};

export const getActionMore = ({
  onActionClick,
  params,
  buttons,
}: {
  params: any;
  onActionClick?: (rowID: any, colID: any) => void;
  buttons: {
    id: string;
    name: string;
    className?: string;
  }[];
}) => {
  const menuItems = buttons?.map((button) => ({
    id: button.id,
    name: button.name,
    className: button.className,
    onClick: () => onActionClick && onActionClick(params.row.id, button.id),
  }));

  return (
    <SePopover menuItems={menuItems} hasClose={false}>
      <IconButton>
        <FontAwesomeIcon icon={faEllipsis} className="text-sm" />
      </IconButton>
    </SePopover>
  );
};

export const renderImage = (params: any, isUser: boolean) => {
  console.log("this is the is user", isUser);
  if (params.row.image || params.row.images) {
    return (
      <div className="min-h-full flex items-center w-10 h-10">
        <CustomImage
          src={
            params?.row?.images?.length
              ? params.row.images[0]
              : params.row.image
          }
          alt={params.row.name}
          className="object-cover rounded-md w-10 h-10"
        />
      </div>
    );
  }
  if (isUser) {
    console.log("we are in the is user");
    return (
      <div className="min-h-full flex items-center justify-center ">
        <Image src={"/profile-image.png"} alt="user" width={40} height={40} />
      </div>
    );
  }
};
export const getCheckBox = ({
  disabled = true,
  onChange,
  checked,
}: {
  disabled?: boolean;
  onChange?: (e: any) => void;
  checked?: boolean;
}) => {
  return (
    <SeCheckbox disabled={disabled} onChange={onChange} checked={checked} />
  );
};
