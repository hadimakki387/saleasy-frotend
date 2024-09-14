import { Pagination } from "@mui/material";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";
import { ColumnGetter } from "./types";
import React from "react";
import SeCard from "../SeCard";
import SeActionBar, { ActionBarProps } from "../ActionBar/SE-ActionBar";
import { ColumnFilter } from "../Columns/types";

type Props = Omit<DataGridProps, "rows" | "columns"> & {
  columnGetter: ColumnGetter;
  onActionClick?: (row: any, column: any) => void;
  rows: any[];
  minWidth?: number | string;
  cardClassName?: string;
  cardLoading?: boolean;
  containerClassName?: string;
  columns?: GridColDef[];
  hiddenColumns?: ColumnFilter[];
  hasCard?: boolean;
  hasPagination?: boolean;
  hasActionBar?: boolean;
  actionBarProps?: ActionBarProps;
  onChange?: (column: string, rowId: string, e: any) => void;
  isColumnDisabled?: (column: string, rowId: string) => boolean;
  aboveTableChildren?: React.ReactNode;
};

function SeTable({
  columnGetter,
  rows,
  minWidth = 1000,
  checkboxSelection = false,
  cardClassName = "",
  containerClassName = "",
  cardLoading = false,
  columns,
  hiddenColumns = [],
  loading,
  hasCard = true,
  hasPagination = true,
  hasActionBar = false,
  onActionClick,
  onChange,
  isColumnDisabled,
  actionBarProps = {
    menuItems: [],
  },
  aboveTableChildren,
  ...props
}: Props) {
  const table = (
    <div className="max-w-full overflow-x-auto">
      {aboveTableChildren}
      <DataGrid
        columnVisibilityModel={hiddenColumns.reduce((acc, cur) => {
          acc[cur.field] = false;
          return acc;
        }, {} as any)}
        disableColumnMenu
        rows={rows}
        checkboxSelection={checkboxSelection}
        columns={
          columnGetter
            ? columnGetter({ onActionClick, onChange, isColumnDisabled })
            : columns
            ? columns
            : []
        }
        hideFooter
        sx={{
          minWidth: minWidth,
          width: "100%",
          ".MuiDataGrid-virtualScroller": {
            minHeight: loading || rows.length <= 3 ? "400px" : "auto",
          },
          ...props.sx,
        }}
        sortingMode="server"
        onSortModelChange={(model) => {
          console.log(model);
        }}
        paginationModel={{
          pageSize: 100,
          page: 0,
        }}
        loading={loading}
        {...props}
      />
    </div>
  );

  return (
    <div className={containerClassName}>
      {hasCard ? (
        <SeCard className={cardClassName} loading={cardLoading}>
          {table}
          {hasActionBar ? (
            <SeActionBar
              {...actionBarProps}
              className={`absolute bottom-6 right-1/2 transform translate-x-1/2 ${actionBarProps.className}`}
            />
          ) : null}
        </SeCard>
      ) : (
        table
      )}
      {hasPagination && (
        <Pagination
          count={10}
          variant="text"
          shape="circular"
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
          }}
        />
      )}
    </div>
  );
}

export default SeTable;
