import { mainApi } from "@/core/rtk-query";
import { Product } from "../components/LandingPage";
import {
  advertisementSection,
  ILinkEntity,
  sectionsTypes,
} from "../interfaces/link-interface";
import { ICategories } from "../interfaces/category-interface";
import { ItemInterface } from "../interfaces/items-interface";
import { ISubCategory } from "../interfaces/sub-categories-interface";
import { ICategoryRelatedItemsSection } from "../interfaces/category-related-items-section";

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
} = extendedApi;
