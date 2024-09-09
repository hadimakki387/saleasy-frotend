import { mainApi } from "@/core/rtk-query";
import { MainPaginatedDto, PaginationInterface } from "@/services/types";
import { ItemInterface } from "../../landing/interfaces/items-interface";
interface ItemResponse extends MainPaginatedDto {
  data: ItemInterface[];
}
interface searchItemsParams extends PaginationInterface {
  price?: number;
}
const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    searchItems: build.query<ItemResponse, searchItemsParams>({
      query: (params) => ({ url: "/item", params }),
    }),
  }),
});

export const { useSearchItemsQuery } = extendedApi;
