import axios from "axios";
import {  ColumnGetter, Response } from "./types";
import { CookieNames, ServerUrl, ToastType } from "./constants";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Correct } from "digital-dojo-sidebar/dist";
import { Attention } from "digital-dojo-sidebar/dist";
import 'react-toastify/dist/ReactToastify.css';
import { ColumnFilter } from "digital-dojo-sidebar/dist/components/global/Columns/types";

export const backendIP = process.env.NEXT_PUBLIC_BACKEND_URL;
export function getImageUrl(image: string) {
  return `${backendIP}/images/${image}`;
}
export async function ApiCall({
  api,
  map = {},
  post = false,
  put = false,
  del = false,
  params = {},
  isFile = false,
  dontLog = false,
}: {
  api: string;
  map?: any;
  post?: boolean;
  put?: boolean;
  del?: boolean;
  params?: any;
  isFile?: boolean;
  dontLog?: boolean;
}): Promise<Response> {
  const headers = {
    "Content-Type": isFile ? "multipart/form-data" : "application/json",
    Authorization: `Bearer ${Cookies.get(CookieNames.access)}`,
  };
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const url = ServerUrl + api;
  try {
    const response = post
      ? await axios.post(url, map, {
          headers: headers,
          params: params,
        })
      : put
      ? await axios.put(url, map, {
          headers: headers,
          params: params,
        })
      : del
      ? await axios.delete(url, {
          headers: headers,
          params: params,
          data: map,
        })
      : await axios.get(url, {
          headers: headers,
          params: params,
        });
    return {
      success: response?.status == 200 || false,
      code: response?.status || 500,
      message: response?.data?.message,
      data: response?.data || null,
    };
  } catch (error: any) {
    if (!dontLog) console.log(error);
    return error?.response
      ? error.response.data
        ? {
            success: false,
            code: error.response.status,
            message: error.response.data.message,
          }
        : {
            success: false,
            message: error.response.statusText,
            code: error.response.status,
          }
      : {
          success: false,
          message: error.message || "Something went wrong",
          code: 500,
        };
  }
}

export function getUniqueID({ prefix = "" }) {
  return `${prefix}${uuidv4()}`;
}

export function generateToast({
  message,
  toastType = ToastType.default,
  duration = 3000,
  isLoading = false,
  icon
}: {
  message: string;
  toastType?: ToastType;
  duration?: number | false;
  isLoading?: boolean;
  icon?: any;
  }): string {
  const id = getUniqueID({ prefix: "toast" });
  toast(message, {
    toastId: id,
    type: toastType,
    autoClose: duration,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    isLoading: isLoading,
    position: "bottom-right",
    closeButton: false,
    icon:icon ? icon : toastType === "error" ? Attention : Correct,
    className: `${toastType === "error" ? "bg-error" : "bg-success"} text-white`,
  });
  return id;
}

export function removeToast(id: string) {
  toast.dismiss(id);
}

export function updateToast(
  id: string,
  message: string,
  {
    toastType,
    isLoading = false,
    duration = 2000,
  icon,
  }: { toastType?: ToastType; isLoading?: boolean; duration?: number ,icon?:any}
) {
  toast.update(id, {
    render: message,
    isLoading: isLoading,
    type: toastType,
    autoClose: duration,
    position: "bottom-right",
    closeButton: false,
    icon:icon ? icon : toastType === "error" ? Attention : Correct,
    className: `${toastType === "error" ? "bg-error" : "bg-success"} text-white`,
  });
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
