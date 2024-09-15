import { ISubCategory } from "@/core/features/customer/landing/interfaces/sub-categories-interface";
import { mainApi } from "@/core/rtk-query";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getCategoriesByStoreId: build.query<ISubCategory[], string>({
      providesTags: ["created_sub_category", "removed_sub_category"],
      query: (storeId) => ({
        url: `/item-sub-category/store/${storeId}`,
      }),
    }),
  }),
});

export const { useGetCategoriesByStoreIdQuery } = extendedApi;
