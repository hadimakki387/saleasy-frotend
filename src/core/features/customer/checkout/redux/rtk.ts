import { mainApi } from "@/core/rtk-query";
import { CreateOrderDto } from "../interfaces/create-order-interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    searchItems: build.query({
      query: (query) => ({
        url: "/item",
        method: "GET",
        params: query,
      }),
    }),
    createOrder: build.mutation<{ message: string }, CreateOrderDto>({
      query: (order) => ({
        url: "/orders/create",
        method: "POST",
        body: order,
      }),
    }),
  }),
});

export const { useSearchItemsQuery, useCreateOrderMutation } = extendedApi;
