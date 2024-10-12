import React from "react";
import SeCard from "../global/SeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import Bell from "../SVGs/Bell";
import { Badge } from "@mui/material";
import ProfileDropdown from "./ProfileDropDown";
import { useAppDispatch, useAppSelector } from "@/providers/StoreWrapper";
import { setToggle } from "@/core/features/admin/global-admin-redux";

type Props = {};

function AdminHeader({}: Props) {
  const { toggle } = useAppSelector((state) => state.GlobalAdminRedux);
  const dispatch = useAppDispatch();
  return (
    <SeCard className="shadow-md shadow-neutral-100">
      <div className="flex items-center justify-between">
        <div>
          <FontAwesomeIcon
            className="text-2xl cursor-pointer md:hidden"
            icon={faBars}
            onClick={() => {
              dispatch(setToggle(!toggle));
            }}
          />
        </div>
        <div className="flex items-center gap-4">
          <Badge badgeContent={4} color="error">
            <Bell size={24} />
          </Badge>
          <div>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </SeCard>
  );
}

export default AdminHeader;
