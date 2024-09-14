import { ColumnsIcon } from "@/components/SVGs/Filter";
import CIPopover from "../Popover/SE-Popover";
import SeButton from "../SeButton";
import SeCheckbox from "../SeCheckbox";

import { ColumnFilter } from "./types";
import React from "react";

type Props = {
  columns: ColumnFilter[];
  setColumns: (columns: ColumnFilter[]) => void;
  hiddenColumns: ColumnFilter[];
  label?: string;
};

function CIColumns({
  columns = [],
  setColumns,
  hiddenColumns = [],
  label,
}: Props) {
  return (
    <CIPopover
      offset={{
        top: 0.5,
        left: -3,
      }}
      hasClose={false}
      menuItems={columns.map((column) => ({
        name: column.headerName,
        suffix: (
          <SeCheckbox
            sx={{ ml: 2 }}
            className="pointer-events-none"
            checked={
              hiddenColumns.find((col) => col.field === column.field) ===
              undefined
            }
          />
        ),
        onClick: () => {
          if (
            hiddenColumns.find((col) => col.field === column.field) ===
            undefined
          ) {
            setColumns([...hiddenColumns, column]);
          } else {
            setColumns(
              hiddenColumns.filter((col) => col.field !== column.field)
            );
          }
        },
      }))}
      closeOnClick={false}
    >
      <SeButton
        label={label || "Columns"}
        endIcon={<ColumnsIcon fill="var(--primary)" />}
      />
    </CIPopover>
  );
}

export default CIColumns;
