import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "../../http/blogService";
import commentService from "../../http/commentService";

const initialState = {
  blog: null,
  blogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "blog/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await blogService.createBlog(data, token);
    } catch (error) {
      console.error(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBlogs = createAsyncThunk(
  "blog/getAllBlogs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await blogService.getBlogs(token);
    } catch (error) {
      console.error(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await blogService.getBlog(id, token);
    } catch (error) {
      console.error(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })

      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.blog = null;
        state.message = action.payload;
      })

      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })

      .addCase(getBlogs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.blogs = [];
        state.message = action.payload;
      })

      .addCase(getBlog.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blog = action.payload;
      })

      .addCase(getBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.blog = null;
        state.message = action.payload;
      })
  },
});

export const { reset } = blogSlice.actions;

export default blogSlice.reducer;