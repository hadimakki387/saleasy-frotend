import {
  advertisementSection,
  ICarousel,
  IHeaderLink,
  IHeroSection,
  ILinkEntity,
  SectionInterface,
  sideBoxInterface,
} from "@/core/features/customer/landing/interfaces/link-interface";
import { getProductsParams } from "@/core/features/customer/landing/redux/rtk";
import { mainApi } from "@/core/rtk-query";
import { AddCarouselItemDto } from "../interfaces/add-carousel-item.dto";
import { UpdateCarouselInterface } from "../interfaces/update-carousel-interface";
import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { ICategoryRelatedItemsSection } from "@/core/features/customer/landing/interfaces/category-related-items-section";
import { ICategories } from "@/core/features/customer/landing/interfaces/category-interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStoreData: builder.query<ILinkEntity, string>({
      query: (id) => `/store/${id}`,
      providesTags: ["logo_changed"],
    }),
    adminGetManuallySelectedItemsSection: builder.query<
      {
        id: string;
        items: ItemInterface[];
        sectionName: string;
        sections: advertisementSection[];
      },
      getProductsParams
    >({
      query: ({ id }) => `/store/manually-selected-items-section/${id}`,
    }),

    adminGetCategoryRelatedItems: builder.query<
      ICategoryRelatedItemsSection,
      getProductsParams
    >({
      query: ({ id }) => `/store/get-category-section-items/${id}`,
    }),
    getAdminCategories: builder.query<ICategories[], string>({
      query: (id) => `/item-category/store/${id}`,
    }),
    updateStoreHeader: builder.mutation<
      IHeaderLink,
      { header: IHeaderLink & { isNewUploaded: boolean }; storeId: string }
    >({
      query: (body) => ({
        url: `link/update-header/${body.storeId}`,
        method: "PATCH",
        body: body.header,
      }),
      invalidatesTags: ["logo_changed"],
      onQueryStarted: async ({ storeId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                draft.link.header = data;
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addCarouselItem: builder.mutation<
      ICarousel,
      { item: FormData; storeId: string; linkId: string }
    >({
      query: (body) => ({
        url: `link/add-carousel-item/${body.linkId}`,
        method: "POST",
        body: body.item,
      }),
      onQueryStarted: async ({ storeId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                draft.link.Hero.Carousel.push(data);
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    editCarouselItem: builder.mutation<
      ICarousel,
      { item: FormData; storeId: string; linkId: string }
    >({
      query: (body) => ({
        url: `link/update-carousel-item/${body.linkId}`,
        method: "PATCH",
        body: body.item,
      }),
      onQueryStarted: async ({ storeId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                const findIndex = draft.link.Hero.Carousel.findIndex(
                  (item) => item.id === data.id
                );
                if (findIndex !== -1) {
                  draft.link.Hero.Carousel[findIndex] = data;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    removeCarouselItem: builder.mutation<
      string,
      { itemId: string; linkId: string; storeId: string }
    >({
      query: ({ itemId, linkId }) => ({
        url: `link/delete-carousel-item/${linkId}/${itemId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { storeId, itemId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                const findIndex = draft.link.Hero.Carousel.findIndex(
                  (item) => item.id === itemId
                );
                if (findIndex !== -1) {
                  draft.link.Hero.Carousel.splice(findIndex, 1);
                }
                console.log("image is deleted");
              }
            )
          );
        } catch (err) {
          console.log("this is the delete error", err);
        }
      },
    }),
    updateSideBox: builder.mutation<
      sideBoxInterface,
      {
        item: FormData;
        storeId: string;
        linkId: string;
        sideboxItem: string;
      }
    >({
      query: (body) => ({
        url: `/link/update-sidebox-item/${body.linkId}/${body.sideboxItem}`,
        method: "PATCH",
        body: body.item,
      }),
      onQueryStarted: async (
        { storeId, sideboxItem },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                const findIndex = draft.link.Hero.sideBoxes.findIndex(
                  (item) => item.id === sideboxItem
                );
                if (findIndex !== -1) {
                  draft.link.Hero.sideBoxes[findIndex] = data;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    updateAdvertisementSection: builder.mutation<
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

          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetManuallySelectedItemsSection",
              { id: storeId },
              (draft) => {
                const findSectionIndex = draft.sections.findIndex(
                  (item) => item.id === advertismentId
                );
                if (findSectionIndex !== -1) {
                  const findAdvertisementIndex =
                    draft.sections[findSectionIndex];

                  draft.sections[findSectionIndex] = data;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    deleteAdvertisementSection: builder.mutation<
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
              "adminGetManuallySelectedItemsSection",
              { id: storeId },
              (draft) => {
                const findSectionIndex = draft.sections.findIndex(
                  (item) => item.id === advertismentId
                );
                if (findSectionIndex !== -1) {
                  draft.sections.splice(findSectionIndex, 1);
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    addAdvertisementSection: builder.mutation<
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
              "adminGetManuallySelectedItemsSection",
              { id: storeId },
              (draft) => {
                draft.sections.push(data);
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateSectionName: builder.mutation<
      { title: string },
      {
        sectionName: string;
        storeId: string;
        sectionId: string;
        linkId: string;
      }
    >({
      query: (body) => ({
        url: `/link/update-section-name/${body.linkId}/${body.sectionId}`,
        method: "PATCH",
        body: { name: body.sectionName },
      }),
      onQueryStarted: async (
        { storeId, sectionId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetManuallySelectedItemsSection",
              { id: storeId },
              (draft) => {
                draft.sectionName = data.title;
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    updateManuallySelectedItems: builder.mutation<
      {
        items: ItemInterface[];
      },
      {
        items: string[];
        storeId: string;
        sectionId: string;
        linkId: string;
      }
    >({
      query: (body) => ({
        url: `/link/update-manually-selected-items/${body.linkId}/${body.sectionId}`,
        method: "PATCH",
        body: { items: body.items },
      }),
      onQueryStarted: async (
        { storeId, sectionId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetManuallySelectedItemsSection",
              { id: storeId },
              (draft) => {
                draft.items = data.items;
              }
            )
          );

          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                const findSectionIndex = draft.link.sections.findIndex(
                  (section) => section.id === sectionId
                );
                if (findSectionIndex !== -1) {
                  draft.link.sections[findSectionIndex].items = data.items?.map(
                    (item) => item.id
                  );
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),

    removeManuallySelectedItem: builder.mutation<
      string,
      {
        itemId: string;
        storeId: string;
        sectionId: string;
        linkId: string;
      }
    >({
      query: ({ itemId, linkId, sectionId }) => ({
        url: `/link/remove-manually-selected-item/${linkId}/${sectionId}/${itemId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { storeId, sectionId, itemId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "adminGetManuallySelectedItemsSection",
              { id: storeId },
              (draft) => {
                const findIndex = draft.items.findIndex(
                  (item) => item.id === itemId
                );
                if (findIndex !== -1) {
                  draft.items.splice(findIndex, 1);
                }
              }
            )
          );
          dispatch(
            extendedApi.util.updateQueryData(
              "getAdminStoreData",
              storeId,
              (draft) => {
                const findSectionIndex = draft.link.sections.findIndex(
                  (section) => section.id === sectionId
                );
                if (findSectionIndex !== -1) {
                  const findItemIndex = draft.link.sections[
                    findSectionIndex
                  ].items?.findIndex((item) => item === itemId);
                  if (findItemIndex && findItemIndex !== -1) {
                    draft.link.sections[findSectionIndex].items?.splice(
                      findItemIndex,
                      1
                    );
                  }
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateCategoryRelatedItemsSection: builder.mutation<
      ICategoryRelatedItemsSection,
      {
        categoryId: string;
        storeId: string;
        linkId: string;
        sectionId: string;
      }
    >({
      query: (body) => ({
        url: `/link/update-category-section/${body.linkId}/${body.sectionId}/${body.categoryId}`,
        method: "PATCH",
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
                draft.createdAt = data.createdAt;
                draft.id = data.id;
                draft.items = data.items;
                draft.updatedAt = data.updatedAt;
                draft.description = data.description;
                draft.name = data.name;
                draft.subCategories = data.subCategories;
                draft.items = data.items;
                draft.image = data.image;
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
  useGetAdminStoreDataQuery,
  useUpdateStoreHeaderMutation,
  useAddCarouselItemMutation,
  useEditCarouselItemMutation,
  useRemoveCarouselItemMutation,
  useUpdateSideBoxMutation,
  useUpdateAdvertisementSectionMutation,
  useDeleteAdvertisementSectionMutation,
  useAddAdvertisementSectionMutation,
  useAdminGetManuallySelectedItemsSectionQuery,
  useUpdateSectionNameMutation,
  useUpdateManuallySelectedItemsMutation,
  useRemoveManuallySelectedItemMutation,
  useAdminGetCategoryRelatedItemsQuery,
  useUpdateCategoryRelatedItemsSectionMutation,
  useGetAdminCategoriesQuery,
} = extendedApi;
