import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "mainApi",
  tagTypes: [
    "removed_sub_category",
    "created_sub_category",
    "updated_sub_category",
    "removed_category",
    "created_category",
    "logo_changed",
    "deals_of_the_day_changed",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      let token = null;

      token = localStorage.getItem("beerer");

      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
});
