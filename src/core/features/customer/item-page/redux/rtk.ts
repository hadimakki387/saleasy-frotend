import { mainApi } from "@/core/rtk-query";
import { ItemInterface } from "../../landing/interfaces/items-interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getItemData: build.query<ItemInterface, string>({
      query: (id: string) => `item/${id}`,
    }),
  }),
});

export const { useGetItemDataQuery } = extendedApi;
