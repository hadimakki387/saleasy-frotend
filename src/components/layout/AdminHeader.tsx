import React from "react";
import SeCard from "../global/SeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import Bell from "../SVGs/Bell";
import { Badge } from "@mui/material";

type Props = {};

function AdminHeader({}: Props) {
  return (
    <SeCard className="shadow-md shadow-neutral-100">
      <div className="flex items-center justify-between">
        <div></div>
        <div>
          <Badge badgeContent={4} color="error">
            <Bell size={24} />
          </Badge>
        </div>
      </div>
    </SeCard>
  );
}

export default AdminHeader;
