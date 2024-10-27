import { mainApi } from "@/core/rtk-query";
import { IOrder, OrderStatus } from "../interfaces/order-entity";

const ordersApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getStoreOrder: build.query<IOrder[], { storeId: string; status: string }>({
      providesTags: ["item_updated"],
      query: ({ storeId, status }) => {
        return {
          url: `/orders/get-store-orders/${storeId}`,
          method: "GET",
          params: {
            status,
          },
        };
      },
    }),
    getSingleOrder: build.query<IOrder, { orderId: string }>({
      providesTags: ["item_updated"],
      query: ({ orderId }) => {
        return {
          url: `/orders/admin/get-order/${orderId}`,
          method: "GET",
        };
      },
    }),

    updateOrderStatus: build.mutation<
      { status: OrderStatus },
      {
        orderId: string;
        newStatus: OrderStatus;
        storeId: string;
        orderStatus: OrderStatus;
      }
    >({
      query: ({ orderId, newStatus }) => {
        return {
          url: `/orders/update-status/${orderId}`,
          method: "PUT",
          body: {
            status: newStatus,
          },
        };
      },
      onQueryStarted: async (
        { storeId, orderStatus, orderId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            ordersApi.util.updateQueryData(
              "getStoreOrder",
              { storeId, status: orderStatus },
              (draft) => {
                const index = draft.findIndex((order) => order.id === orderId);
                console.log("index", index);
                if (index !== -1) {
                  console.log("orderUpdated", data);
                  draft[index].status = data.status;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useGetStoreOrderQuery,
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} = ordersApi;
