import {
  ICarousel,
  IHeaderLink,
  IHeroSection,
  ILinkEntity,
  sideBoxInterface,
} from "@/core/features/customer/landing/interfaces/link-interface";
import { getProductsParams } from "@/core/features/customer/landing/redux/rtk";
import { mainApi } from "@/core/rtk-query";
import { AddCarouselItemDto } from "../interfaces/add-carousel-item.dto";
import { UpdateCarouselInterface } from "../interfaces/update-carousel-interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStoreData: builder.query<ILinkEntity, string>({
      query: (id) => `/store/${id}`,
      providesTags: ["logo_changed"],
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
  }),
});

export const {
  useGetAdminStoreDataQuery,
  useUpdateStoreHeaderMutation,
  useAddCarouselItemMutation,
  useEditCarouselItemMutation,
  useRemoveCarouselItemMutation,
  useUpdateSideBoxMutation,
} = extendedApi;
