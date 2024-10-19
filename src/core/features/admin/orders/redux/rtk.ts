import { mainApi } from "@/core/rtk-query";

const ordersApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getStoreOrder: build.query({
      query: (id: string) => `/orders/get-store-orders/${id}`,
    }),
  }),
});

export const { useGetStoreOrderQuery } = ordersApi;
