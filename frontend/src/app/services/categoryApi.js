import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Categories', 'UserPermissions'],
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
      providesTags: ['Categories'],
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
    addUserPermission: builder.mutation({
      query: ({ email, role, categoryId }) => ({
        url: 'category/addPermission',
        method: 'POST',
        body: { email, role, categoryId },
      }),
      invalidatesTags: ['UserPermissions'],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddUserPermissionMutation,
  useGetCategoryUserPermissionsQuery,
} = categoryApi;
