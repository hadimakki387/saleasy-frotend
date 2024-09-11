import { mainApi } from "@/core/rtk-query";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    searchItems: build.query({
      query: (query) => ({
        url: "/items",
        method: "GET",
        params: query,
      }),
    }),
  }),
});

export const { useSearchItemsQuery } = extendedApi;
