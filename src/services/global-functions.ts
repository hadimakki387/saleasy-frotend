import { ColumnFilter } from "@/components/global/Columns/types";
import { ColumnGetter } from "@/components/global/Table/types";

export const backendIP = process.env.NEXT_PUBLIC_BACKEND_URL;
export function getImageUrl(image: string) {
  return `${backendIP}/images/${image}`;
}

export function getHeaderNames(columns: ColumnGetter): ColumnFilter[] {
  return columns({})
    .filter(
      (col) =>
        col.headerName && col.headerName != "" && col.field && col.field != ""
    )
    .map((col) => ({
      field: col.field || "",
      headerName: col.headerName || "",
    }));
}

export const hexToRGBA = (hexCode: string, opacity: number) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity}) !important`;
};

export function getFormattedDate(date: Date): string {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();
  return `${day < 10 ? "0" + day : day}.${
    month < 10 ? "0" + month : month
  }.${year} ${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
}
export function getBase64(file: File, cb: (base64: string) => void) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result as string);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
}
