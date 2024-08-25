import { mainApi } from "@/core/rtk-query";
import { Product } from "../components/LandingPage";

interface getProductsParams {
  id: string;
}
export const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], getProductsParams>({
      query: ({ id }) => "/test/products",
    }),
    addProduct: build.mutation<Product, Product>({
      query: (body) => ({
        url: "/test/products",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useAddProductMutation } = extendedApi;
