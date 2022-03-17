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
    addCategory: builder.mutation({
      query: ({ name }) => ({
        url: 'category/add',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoriesQuery, usePrefetch } =
  categoryApi;
