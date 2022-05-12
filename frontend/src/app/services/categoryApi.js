import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  tagTypes: ['Categories'],
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
    getCategories: builder.query({
      query: () => ({ url: 'category/getAll' }),
      providesTags: ['Categories'],
    }),
    getCategory: builder.query({
      query: ({ id }) => ({ url: `category/${id}` }),
    }),
    addCategory: builder.mutation({
      query: ({ name, description }) => ({
        url: 'category/add',
        method: 'POST',
        body: { name, description },
      }),
      invalidatesTags: ['Categories'],
    }),
    addUserPermission: builder.mutation({
      query: ({ email, role, categoryId }) => ({
        url: 'category/addPermission',
        method: 'POST',
        body: { email, role, categoryId },
      }),
      invalidatesTags: ['SubCategories'],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddUserPermissionMutation,
} = categoryApi;
