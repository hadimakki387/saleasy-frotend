import { mainApi } from "@/core/rtk-query";
import { IOrder } from "../interfaces/order-entity";

const ordersApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getStoreOrder: build.query<IOrder[], string>({
      providesTags: ["item_updated"],
      query: (id: string) => `/orders/get-store-orders/${id}`,
    }),
  }),
});

export const { useGetStoreOrderQuery } = ordersApi;
