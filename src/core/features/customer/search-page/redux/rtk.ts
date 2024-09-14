import { mainApi } from "@/core/rtk-query";
import { MainPaginatedDto, PaginationInterface } from "@/services/types";
import { ItemInterface } from "../../landing/interfaces/items-interface";
export interface ItemResponse extends MainPaginatedDto {
  data: ItemInterface[];
}
export interface searchItemsParams extends PaginationInterface {
  price?: number;
  storeId?: string;
  minPrice?: number;
  maxPrice?: number;
  minDiscount?: number;
  maxDiscount?: number;
}
const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    searchItems: build.query<ItemResponse, searchItemsParams>({
      query: (params) => {
        const { storeId, ...restParams } = params;
        return { url: `/item/store/${storeId}`, params: restParams };
      },
    }),
  }),
});

export const { useSearchItemsQuery } = extendedApi;
