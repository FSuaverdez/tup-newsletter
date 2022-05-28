import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Post', 'Comment'],
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
    getAllPosts: builder.query({
      query: () => ({ url: 'post/getAll' }),
      providesTags: ['Post'],
    }),
    getAllPostsByCategory: builder.query({
      query: ({ id }) => ({ url: 'post/getAll/category/' + id }),
      providesTags: ['Post'],
    }),
    getAllPostsBySubCategory: builder.query({
      query: ({ id }) => ({ url: 'post/getAll/subcategory/' + id }),
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: ({ id }) => ({ url: 'post/get/' + id }),
      providesTags: ['Post'],
    }),
    getComments: builder.query({
      query: () => ({ url: 'post/getAll' }),
      providesTags: ['Post'],
    }),
    addComment: builder.mutation({
      query: ({ text, id }) => ({
        url: 'post/coment/' + id,
        method: 'POST',
        body: {
          text,
        },
      }),
      invalidatesTags: ['Comment'],
    }),
    addPost: builder.mutation({
      query: ({ title, type, liveUrl, content, category, subCategory }) => ({
        url: 'post/add',
        method: 'POST',
        body: {
          title,
          type,
          liveUrl,
          content,
          category,
          subCategory,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    editPost: builder.mutation({
      query: ({
        id,
        title,
        type,
        liveUrl,
        content,
        category,
        subCategory,
      }) => ({
        url: 'post/edit/' + id,
        method: 'PUT',
        body: {
          title,
          type,
          liveUrl,
          content,
          category,
          subCategory,
        },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetAllPostsQuery,
  useAddCommentMutation,
  useEditPostMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useGetAllPostsByCategoryQuery,
  useGetAllPostsBySubCategoryQuery,
} = postApi;
