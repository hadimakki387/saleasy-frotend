import { mainApi } from "@/core/rtk-query";
import { Product } from "../components/LandingPage";
import {
  AuthenticationResponse,
  LoginInterface,
  RegisterInterface,
} from "../interfaces/authentication-interface";
import { ICategories } from "../interfaces/category-interface";
import { ICategoryRelatedItemsSection } from "../interfaces/category-related-items-section";
import { ItemInterface } from "../interfaces/items-interface";
import {
  advertisementSection,
  ILinkEntity,
} from "../interfaces/link-interface";
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
    getStoreData: build.query<ILinkEntity, getProductsParams>({
      query: ({ id }) => `/store/${id}`,
    }),
    getStoreCategories: build.query<ICategories[], getProductsParams>({
      query: ({ id }) => `/item-category/get-categories-by-store-id/${id}`,
    }),
    getStoreDealsOfTheDay: build.query<ItemInterface[], getProductsParams>({
      query: ({ id }) => `/store/deals-of-the-day/${id}`,
    }),
    getManuallySelectedItemsSection: build.query<
      {
        items: ItemInterface[];
        sectionName: string;
        sections: advertisementSection[];
      },
      getProductsParams
    >({
      query: ({ id }) => `/store/manually-selected-items-section/${id}`,
    }),
    getCategoryRelatedItems: build.query<
      ICategoryRelatedItemsSection,
      getProductsParams
    >({
      query: ({ id }) => `/store/get-category-section-items/${id}`,
    }),
    login: build.mutation<AuthenticationResponse, LoginInterface>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthenticationResponse) => {
        localStorage.setItem("beerer", response.token);
        return response;
      },
    }),
    register: build.mutation<AuthenticationResponse, RegisterInterface>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      transformResponse: (response: AuthenticationResponse) => {
        localStorage.setItem("beerer", response.token);
        return response;
      },
    }),
    testAuth: build.mutation<any, void>({
      query: () => ({
        url: "/auth/test-auth",
        method: "POST",
      }),
    }),
    getMe: build.query<AuthenticationResponse, void>({
      query: () => "/auth/me",
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetStoreDataQuery,
  useGetStoreCategoriesQuery,
  useGetStoreDealsOfTheDayQuery,
  useGetManuallySelectedItemsSectionQuery,
  useGetCategoryRelatedItemsQuery,
  useLoginMutation,
  useRegisterMutation,
  useTestAuthMutation,
  useGetMeQuery,
} = extendedApi;
