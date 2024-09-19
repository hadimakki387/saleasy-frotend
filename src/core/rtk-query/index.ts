import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function to get the token only in the client-side
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("beerer");
  }
  return null;
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  tagTypes: [
    "removed_sub_category",
    "created_sub_category",
    "updated_sub_category",
    "removed_category",
    "created_category",
    "logo_changed",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
