import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const subCategoryApi = createApi({
  reducerPath: 'subCategoryApi',
  tagTypes: ['SubCategories'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
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
    addUserPermission: builder.mutation({
      query: ({ email, role, subCategoryId }) => ({
        url: 'subcategory/addPermission',
        method: 'POST',
        body: { email, role, subCategoryId },
      }),
      invalidatesTags: ['UserPermissions'],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetSubCategoryQuery,
  useAddSubCategoryMutation,
  useGetSubCategoriesByCategoryQuery,
  useAddUserPermissionMutation,
  useGetSubCategoryUserPermissionsQuery,
} = subCategoryApi;
