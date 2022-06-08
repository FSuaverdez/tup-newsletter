import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_SERVER
    : 'http://localhost:5000/';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  tagTypes: ['Categories', 'UserPermissions', 'SubCategories'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => ({ url: 'category/getAll' }),
      providesTags: ['Categories', 'SubCategories'],
    }),
    getCategory: builder.query({
      query: ({ id }) => ({ url: `category/${id}` }),
      providesTags: ['Categories'],
    }),
    getCategoryUserPermissions: builder.query({
      query: ({ id }) => ({ url: `category/${id}/userPermissions` }),
      providesTags: ['UserPermissions'],
    }),
    addCategory: builder.mutation({
      query: ({ name, description }) => ({
        url: 'category/add',
        method: 'POST',
        body: { name, description },
      }),
      invalidatesTags: ['Categories'],
    }),
    editCategory: builder.mutation({
      query: ({ name, description, categoryId }) => ({
        url: `category/edit/${categoryId}`,
        method: 'PUT',
        body: { name, description, categoryId },
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `category/delete/${categoryId}`,
        method: 'DELETE',
        body: { categoryId },
      }),
      invalidatesTags: ['Categories', 'SubCategories'],
    }),
    addUserPermissionCategory: builder.mutation({
      query: ({ email, role, categoryId }) => ({
        url: 'category/addPermission',
        method: 'POST',
        body: { email, role, categoryId },
      }),
      invalidatesTags: ['UserPermissions'],
    }),
    editUserPermissionCategory: builder.mutation({
      query: ({ id, email, role, categoryId }) => ({
        url: 'category/editPermission',
        method: 'PUT',
        body: { id, email, role, categoryId },
      }),
      invalidatesTags: ['UserPermissions'],
    }),
    removeUserPermissionCategory: builder.mutation({
      query: ({ id, categoryId }) => ({
        url: 'category/removePermission',
        method: 'DELETE',
        body: { id, categoryId },
      }),
      invalidatesTags: ['UserPermissions', 'Categories'],
    }),
    addCategorySubscriber: builder.mutation({
      query: ({ type, id }) => ({
        url: 'category/subscribe',
        method: 'POST',
        body: { type, id },
      }),
      invalidatesTags: ['Categories'],
    }),
    removeCategorySubscriber: builder.mutation({
      query: ({ type, id }) => ({
        url: 'category/unsubscribe',
        method: 'PUT',
        body: { type, id },
      }),
      invalidatesTags: ['Categories'],
    }),
    getSubCategories: builder.query({
      query: () => ({ url: 'subcategory/getAll' }),
      providesTags: ['SubCategories'],
    }),
    getSubCategoriesByCategory: builder.query({
      query: subCategoryId => ({ url: `subcategory/getAll/${subCategoryId}` }),
      providesTags: ['SubCategories'],
    }),
    getSubCategory: builder.query({
      query: ({ id }) => ({ url: `subcategory/${id}` }),
      providesTags: ['SubCategories'],
    }),
    getSubCategoryUserPermissions: builder.query({
      query: ({ id }) => ({ url: `subcategory/${id}/userPermissions` }),
      providesTags: ['UserPermissions'],
    }),
    addSubCategory: builder.mutation({
      query: ({ name, description, categoryId }) => ({
        url: 'subcategory/add',
        method: 'POST',
        body: { name, description, categoryId },
      }),
      invalidatesTags: ['SubCategories'],
    }),
    editSubCategory: builder.mutation({
      query: ({ name, description, subCategoryId, categoryId }) => ({
        url: `subcategory/edit/${subCategoryId}`,
        method: 'PUT',
        body: { name, description, categoryId },
      }),
      invalidatesTags: ['SubCategories'],
    }),
    deleteSubCategory: builder.mutation({
      query: ({ subCategoryId }) => ({
        url: `subcategory/delete/${subCategoryId}`,
        method: 'DELETE',
        body: { subCategoryId },
      }),
      invalidatesTags: ['SubCategories', 'Categories'],
    }),
    addUserPermissionSubCategory: builder.mutation({
      query: ({ email, role, subCategoryId }) => ({
        url: 'subcategory/addPermission',
        method: 'POST',
        body: { email, role, subCategoryId },
      }),
      invalidatesTags: ['UserPermissions'],
    }),
    editUserPermissionSubCategory: builder.mutation({
      query: ({ id, email, role, subCategoryId }) => ({
        url: 'subcategory/editPermission',
        method: 'PUT',
        body: { id, email, role, subCategoryId },
      }),
      invalidatesTags: ['UserPermissions'],
    }),
    removeUserPermissionSubCategory: builder.mutation({
      query: ({ id, subCategoryId }) => ({
        url: 'subcategory/removePermission',
        method: 'DELETE',
        body: { id, subCategoryId },
      }),
      invalidatesTags: ['UserPermissions', 'SubCategories'],
    }),
    addSubCategorySubscriber: builder.mutation({
      query: ({ type, id }) => ({
        url: 'subcategory/subscribe',
        method: 'POST',
        body: { type, id },
      }),
      invalidatesTags: ['SubCategories'],
    }),
    removeSubCategorySubscriber: builder.mutation({
      query: ({ type, id }) => ({
        url: 'subcategory/unsubscribe',
        method: 'PUT',
        body: { type, id },
      }),
      invalidatesTags: ['SubCategories'],
    }),
    addFilteredWord: builder.mutation({
      query: ({ word }) => ({
        url: 'filteredword/add',
        method: 'POST',
        body: { word },
      }),
      invalidatesTags: ['Filter'],
    }),
    getFilteredWords: builder.query({
      query: () => ({
        url: 'filteredword/getAll',
        method: 'GET',
      }),
      providesTags: ['Filter'],
    }),
    removeFilteredWord: builder.mutation({
      query: ({ word, id }) => ({
        url: 'filteredword/remove/' + id,
        method: 'DELETE',
        body: { word },
      }),
      invalidatesTags: ['Filter'],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddUserPermissionCategoryMutation,
  useGetCategoryUserPermissionsQuery,
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useEditSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useAddUserPermissionSubCategoryMutation,
  useGetSubCategoryUserPermissionsQuery,
  useAddCategorySubscriberMutation,
  useAddSubCategorySubscriberMutation,
  useRemoveCategorySubscriberMutation,
  useRemoveSubCategorySubscriberMutation,
  useAddFilteredWordMutation,
  useGetFilteredWordsQuery,
  useRemoveFilteredWordMutation,
  useRemoveUserPermissionCategoryMutation,
  useRemoveUserPermissionSubCategoryMutation,
  useEditUserPermissionCategoryMutation,
  useEditUserPermissionSubCategoryMutation,
} = adminApi;
