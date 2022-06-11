import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
  process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_SERVER
    : 'http://localhost:5000/';

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Post'],
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
    getAllPosts: builder.query({
      query: () => ({ url: 'post/getAll' }),
      providesTags: ['Post'],
    }),
    getAllHomePosts: builder.query({
      query: ({
        page,
        searchOption: { searchQuery, category, subCategory, fromDate, toDate },
      }) => ({
        url: `post/getAll/home/${page}?${
          searchQuery ? `searchQuery=${searchQuery}` : ''
        }${category ? `&category=${category}` : ''}${
          subCategory ? `&subCategory=${subCategory}` : ''
        }${fromDate ? `&fromDate=${fromDate}` : ''}${
          toDate ? `&toDate=${toDate}` : ''
        }`,
      }),
      providesTags: ['Post'],
    }),
    getAllPostsByCategory: builder.query({
      query: ({
        id,
        page,
        searchOption: { searchQuery, fromDate, toDate },
      }) => ({
        url: `post/getAll/category/${id}/${page}?${
          searchQuery ? `searchQuery=${searchQuery}` : ''
        }${fromDate ? `&fromDate=${fromDate}` : ''}${
          toDate ? `&toDate=${toDate}` : ''
        }`,
      }),
      providesTags: ['Post'],
    }),
    getAllPostsBySubCategory: builder.query({
      query: ({
        id,
        page,
        searchOption: { searchQuery, fromDate, toDate },
      }) => ({
        url: `post/getAll/subcategory/${id}/${page}?${
          searchQuery ? `searchQuery=${searchQuery}` : ''
        }${fromDate ? `&fromDate=${fromDate}` : ''}${
          toDate ? `&toDate=${toDate}` : ''
        }`,
      }),
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
        url: 'post/comment/' + id,
        method: 'POST',
        body: {
          text,
        },
      }),
      invalidatesTags: ['Post'],
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
        postId,
        title,
        type,
        liveUrl,
        content,
        category,
        subCategory,
      }) => ({
        url: 'post/edit/' + postId,
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
    deletePost: builder.mutation({
      query: ({ postId }) => ({
        url: 'post/delete/' + postId,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: ['Post'],
    }),
    approvePost: builder.mutation({
      query: ({ id, approved }) => ({
        url: 'post/approve/' + id,
        method: 'PUT',
        body: {
          approved,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: 'post/comment/delete',
        method: 'DELETE',
        body: { postId, commentId },
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

export const {
  useAddPostMutation,
  useGetAllPostsQuery,
  useGetAllHomePostsQuery,
  useAddCommentMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useApprovePostMutation,
  useGetCommentsQuery,
  useGetPostQuery,
  useGetAllPostsByCategoryQuery,
  useGetAllPostsBySubCategoryQuery,
  useDeleteCommentMutation,
} = postApi;
