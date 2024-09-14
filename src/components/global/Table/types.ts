import { GridColDef } from "@mui/x-data-grid";
export type ColumnGetter = ({
    onActionClick,
    isColumnDisabled,
    onChange,
  }: {
    onActionClick?: (rowID: any, colID: any) => void;
    onChange?: (rowID: any, colID: any, value: any) => void;
    isColumnDisabled?: (rowID: any, colID: any) => boolean;
  }) => GridColDef[];