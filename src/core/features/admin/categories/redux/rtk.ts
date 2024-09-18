import { mainApi } from "@/core/rtk-query";
import { CategoryWithSubCategoriesInterface } from "../interfaces/categories-with-sub-categories";
import { CreatedItemSubCategory } from "../interfaces/created-sub-category";
import { ICategories } from "@/core/features/customer/landing/interfaces/category-interface";

const extendedApi = mainApi.injectEndpoints({
  endpoints: (build) => ({
    getACategoriesWithSubCategories: build.query<
      CategoryWithSubCategoriesInterface[],
      string
    >({
      providesTags: ["removed_sub_category", "removed_category"],
      query: (storeId) => ({
        url: `item-category/get-categories-by-store-id/${storeId}`,
        method: "GET",
      }),
    }),
    addSubCategory: build.mutation<
      CreatedItemSubCategory,
      { name: string; category: string; storeId: string }
    >({
      invalidatesTags: ["created_sub_category"],
      query: (data) => ({
        url: `/item-sub-category/create`,
        method: "POST",
        body: {
          name: data.name,
          category: data.category,
        },
      }),
      onQueryStarted: async (
        { name, storeId, category },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const createdCategories = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getACategoriesWithSubCategories",
              storeId,
              (draft) => {
                const findCategory = draft.findIndex(
                  (cat) => cat.id === category
                );
                if (findCategory !== -1) {
                  draft[findCategory].subCategories.push(
                    createdCategories.data
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
    deleteSubCategory: build.mutation<
      { id: string },
      { subCategoryId: string; storeId: string; categoryId: string }
    >({
      invalidatesTags: ["removed_sub_category"],
      query: ({ subCategoryId }) => ({
        url: `item-sub-category/${subCategoryId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { storeId, categoryId, subCategoryId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getACategoriesWithSubCategories",
              storeId,
              (draft) => {
                const findCategory = draft.findIndex(
                  (cat) => cat.id === categoryId
                );
                if (findCategory !== -1) {
                  const findSubCategory = draft[
                    findCategory
                  ].subCategories.findIndex(
                    (subCat) => subCat.id === subCategoryId
                  );
                  if (findSubCategory !== -1) {
                    draft[findCategory].subCategories.splice(
                      findSubCategory,
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
    updateSubCategory: build.mutation<
      { id: string },
      { name: string; subCategoryId: string; storeId: string }
    >({
      query: ({ name, subCategoryId }) => ({
        url: `/item-sub-category/${subCategoryId}`,
        method: "PATCH",
        body: {
          name,
        },
      }),
      onQueryStarted: async (
        { name, storeId, subCategoryId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getACategoriesWithSubCategories",
              storeId,
              (draft) => {
                draft.forEach((cat) => {
                  cat.subCategories.forEach((subCat) => {
                    if (subCat.id === subCategoryId) {
                      subCat.name = name;
                    }
                  });
                });
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    deleteCategory: build.mutation<
      { id: string },
      { categoryId: string; storeId: string }
    >({
      invalidatesTags: ["removed_category"],
      query: ({ categoryId }) => ({
        url: `item-category/${categoryId}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { storeId, categoryId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getACategoriesWithSubCategories",
              storeId,
              (draft) => {
                const findCategory = draft.findIndex(
                  (cat) => cat.id === categoryId
                );
                if (findCategory !== -1) {
                  draft.splice(findCategory, 1);
                }
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    createCategory: build.mutation<
      ICategories,
      {
        storeId: string;
        data: FormData;
      }
    >({
      invalidatesTags: ["created_category"],
      query: ({ data }) => ({
        url: `/item-category/create`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async ({ storeId }, { dispatch, queryFulfilled }) => {
        try {
          const createdCategory = await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getACategoriesWithSubCategories",
              storeId,
              (draft) => {
                console.log(draft);
                draft.push({ ...createdCategory.data, subCategories: [] });
              }
            )
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    updateCategoryName: build.mutation<
      ICategories,
      { name: string; categoryId: string; storeId: string }
    >({
      query: ({ name, categoryId }) => ({
        url: `/item-category/update-name/${categoryId}`,
        method: "PATCH",
        body: {
          name,
        },
      }),
      onQueryStarted: async (
        { name, storeId, categoryId },
        { dispatch, queryFulfilled }
      ) => {
        try {
          await queryFulfilled;

          dispatch(
            extendedApi.util.updateQueryData(
              "getACategoriesWithSubCategories",
              storeId,
              (draft) => {
                const findCategory = draft.findIndex(
                  (cat) => cat.id === categoryId
                );
                if (findCategory !== -1) {
                  draft[findCategory].name = name;
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
  useGetACategoriesWithSubCategoriesQuery,
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryNameMutation,
} = extendedApi;
