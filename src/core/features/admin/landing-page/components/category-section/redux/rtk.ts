import { ICategoryRelatedItemsSection } from "@/core/features/customer/landing/interfaces/category-related-items-section";
import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import {
  advertisementSection,
  SectionInterface,
} from "@/core/features/customer/landing/interfaces/link-interface";
import { getProductsParams } from "@/core/features/customer/landing/redux/rtk";
import { mainApi } from "@/core/rtk-query";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    adminGetCategoryRelatedItems: builder.query<
      ICategoryRelatedItemsSection,
      getProductsParams
    >({
      query: ({ id }) => `/store/get-category-section-items/${id}`,
    }),
    updateDealsOfTheDayAdvertismentSection: builder.mutation<
      advertisementSection,
      {
        item: FormData;
        storeId: string;
        linkId: string;
        advertismentId: string;
        sectionId: string;
      }
    >({
      query: (body) => ({
        url: `/link/update-advertisment-section/${body.linkId}/${body.sectionId}/${body.advertismentId}`,
        method: "PATCH",
        body: body.item,
      }),
      onQueryStarted: async (
        { storeId, advertismentId, sectionId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          console.log("this is the data", data);
          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetCategoryRelatedItems",
              { id: storeId },
              (draft) => {
                console.log("this is the draft", draft);
                console.log("this is the data", data);

                const findSectionIndex =
                  draft.section.advertisementSection.findIndex(
                    (item) => item.id === advertismentId
                  );
                console.log("this is the findSectionIndex", findSectionIndex);
                if (findSectionIndex !== -1) {
                  draft.section.advertisementSection[findSectionIndex] = data;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    dealsOfTheDayDeleteAdvertisementSection: builder.mutation<
      string,
      {
        advertismentId: string;
        linkId: string;
        storeId: string;
        sectionId: string;
      }
    >({
      query: ({ advertismentId, linkId, sectionId }) => ({
        url: `/link/delete-advertisment-section/${linkId}/${sectionId}/${advertismentId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { storeId, advertismentId, sectionId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetCategoryRelatedItems",
              { id: storeId },
              (draft) => {
                draft.section.advertisementSection =
                  draft.section.advertisementSection.filter(
                    (item) => item.id !== advertismentId
                  );
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    dealsOfTheDayAddAdvertisementSection: builder.mutation<
      advertisementSection,
      {
        item: FormData;
        storeId: string;
        linkId: string;
        sectionId: string;
      }
    >({
      query: (body) => ({
        url: `/link/add-advertisment-section/${body.linkId}/${body.sectionId}`,
        method: "POST",
        body: body.item,
      }),
      onQueryStarted: async (
        { storeId, sectionId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetCategoryRelatedItems",
              { id: storeId },
              (draft) => {
                draft.section.advertisementSection.push(data);
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
  useAdminGetCategoryRelatedItemsQuery,
  useUpdateDealsOfTheDayAdvertismentSectionMutation,
  useDealsOfTheDayDeleteAdvertisementSectionMutation,
  useDealsOfTheDayAddAdvertisementSectionMutation,
} = extendedApi;
