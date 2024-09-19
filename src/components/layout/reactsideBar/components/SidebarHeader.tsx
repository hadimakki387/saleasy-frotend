import styled from "@emotion/styled";
import React from "react";
import { Typography } from "./Typography";
import Institution from "@/components/SVGs/Institution";
import { useAppSelector } from "@/providers/StoreWrapper";
import ProfileAvatar from "@/components/global/SeProfileAvatar";
import CustomImage from "@/components/global/CustomImage";
import SeLoader from "@/components/global/SeLoader";

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  rtl: boolean;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;

//i want to trim the first letter of the first name and put it in avatar
export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  children,
  rtl,
  ...rest
}) => {
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  return (
    <StyledSidebarHeader {...rest}>
      {store ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="flex items-center w-full">
            <CustomImage
              src={store?.logo}
              alt={`${store?.name}-logo`}
              size={store.link.header.logoSize}
              className=" ml-4"
            />
            {/* <div className="flex-col gap-4">
              <div className="text-subTitleText font-semibold">{`${user?.firstName} ${user?.lastName}`}</div>
            </div> */}
          </div>
        </div>
      ) : (
        <SeLoader />
      )}
    </StyledSidebarHeader>
  );
};
