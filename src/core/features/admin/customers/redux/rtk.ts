import {
  AuthenticationResponse,
  LoginInterface,
} from "@/core/features/customer/landing/interfaces/authentication-interface";
import { UserInterface } from "@/core/features/customer/landing/interfaces/user-interface";
import { mainApi } from "@/core/rtk-query";
import { PaginationInterface } from "@/services/types";

interface getStoreCustomersInterface extends PaginationInterface {
  data: UserInterface[];
}
const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getStoreCustomers: builder.query<
      getStoreCustomersInterface,
      {
        storeId: string;
        limit: number;
        page: number;
        name: string;
      }
    >({
      query: ({ storeId, limit, name, page }) => {
        {
          return {
            url: `/store/store-customers/${storeId}`,
            method: "GET",
            params: {
              limit,
              page,
              name,
            },
          };
        }
      },
    }),
  }),
});

export const { useGetStoreCustomersQuery } = extendedApi;
