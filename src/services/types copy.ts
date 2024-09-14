import { GridColDef } from "@mui/x-data-grid";


export interface Response {
  success: boolean;
  code?: number;
  message?: string;
  data?: Object | Array<Object> | undefined;
}

export interface UserGroupInterface {
  title: string;
  id: string;
}

export type ColumnGetter = ({
  onActionClick,
  isColumnDisabled,
  onChange,
}: {
  onActionClick?: (rowID: any, colID: any) => void;
  onChange?: (rowID: any, colID: any, value: any) => void;
  isColumnDisabled?: (rowID: any, colID: any) => boolean;
}) => GridColDef[];

export type Base64AndImageName = {
  originalName: string;
  base64: string;
};


export interface Location {
  latitude: number;
  longitude: number;
}
export interface Permission {
  userGroups: string[];
  allUsers?: boolean;
}

export interface RecipientType {
  id: string;
  title: string;
}

export interface VerificationType {
  id: string;
  phone: boolean;
  email: boolean;
  receipt: boolean;
  mail: boolean;
  geoLocation: boolean;
}