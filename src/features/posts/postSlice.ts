import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (page: number) => {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
  return {
    data: response.data as Post[],
    totalPages: Math.ceil(parseInt(response.headers['x-total-count']) / 10),
    currentPage: page,
  };
});

export const createPost = createAsyncThunk('posts/createPost', async (post: Omit<Post, 'id'>) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
  return response.data as Post;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post: Post) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  return response.data as Post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id: number) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return id;
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        state.posts[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  },
});

export default postSlice.reducer;
