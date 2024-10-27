import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { mainApi } from "@/core/rtk-query";
import { UpdateItemInterface } from "../interface/update-item";
import {
  ItemResponse,
  searchItemsParams,
} from "@/core/features/customer/search-page/redux/rtk";
import { CreateItemDto } from "../interface/create-item";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    searchAdminItems: build.query<ItemResponse, searchItemsParams>({
      providesTags: ["removed_sub_category"],
      query: (params) => {
        const { storeId, ...restParams } = params;
        return { url: `/item/store/${storeId}`, params: restParams };
      },
    }),
    uploadImage: build.mutation<{ id: string }, FormData>({
      query: (data) => ({
        url: "media/upload",
        method: "POST",
        body: data,
      }),
    }),
    updateItemImage: build.mutation<
      { id: string },
      { images: string[]; itemId: string }
    >({
      query: (data) => ({
        url: `item/update-item-images/${data.itemId}`,
        method: "POST",
        body: {
          images: data.images,
        },
      }),
    }),
    deleteImage: build.mutation<{ id: string }, { id: string }>({
      query: (data) => ({
        url: `media/delete/${data.id}`,
        method: "DELETE",
      }),
    }),
    updateItem: build.mutation<
      ItemInterface,
      {
        data: UpdateItemInterface;
        itemId: string;
        storeId: string;
        name: string;
        page: number;
        limit: number;
      }
    >({
      invalidatesTags: ["item_updated"],
      query: ({ data, itemId }) => {
        console.log(itemId);
        return {
          url: `item/update-item/${itemId}`,
          method: "POST",
          body: data,
        };
      },
      onQueryStarted: async (
        { storeId, data, name, page, limit },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: updatedUser } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "searchAdminItems",
              { storeId, name, page, limit },
              (draft) => {
                const index = draft.data.findIndex(
                  (item) => item.id === updatedUser.id
                );
                console.log(index);
                if (index !== -1) {
                  draft.data[index].name = updatedUser.name;
                  draft.data[index].description = updatedUser.description;
                  draft.data[index].price = updatedUser.price;
                  draft.data[index].stock = updatedUser.stock;
                  draft.data[index].options = updatedUser.options;
                  draft.data[index].images = updatedUser.images;
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    createdItem: build.mutation<
      ItemInterface,
      {
        data: CreateItemDto;
        storeId: string;
        name: string;
        page: number;
        limit: number;
      }
    >({
      query: (data) => ({
        url: "item/create",
        method: "POST",
        body: data.data,
      }),
      onQueryStarted: async (
        { storeId, data, name, limit, page },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data: createdItem } = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "searchAdminItems",
              { storeId, name, limit, page },
              (draft) => {
                draft.data.push(createdItem);
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteItem: build.mutation<
      { id: string },
      {
        itemId: string;
        storeId: string;
        name: string;
        page: number;
        limit: number;
      }
    >({
      query: ({ itemId }) => ({
        url: `item/delete/${itemId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { storeId, name, itemId, limit, page },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "searchAdminItems",
              { storeId, name, limit, page },
              (draft) => {
                const index = draft.data.findIndex(
                  (item) => item.id === itemId
                );
                console.log(index);
                if (index !== -1) {
                  draft.data.splice(index, 1);
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
  useSearchAdminItemsQuery,
  useUploadImageMutation,
  useUpdateItemImageMutation,
  useDeleteImageMutation,
  useUpdateItemMutation,
  useCreatedItemMutation,
  useDeleteItemMutation,
} = extendedApi;
