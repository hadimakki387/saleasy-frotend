import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { mainApi } from "@/core/rtk-query";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getStoreItems: build.query<ItemInterface[], string>({
      query: (id: string) => `store/items/${id}`,
    }),
  }),
});

export const { useGetStoreItemsQuery } = extendedApi;
