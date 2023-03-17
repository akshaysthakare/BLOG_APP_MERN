import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentService from "../../http/commentService";

const initialState = {
  comment: null,
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createComment = createAsyncThunk(
  "comment/create",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await commentService.createComment(data, token);
    } catch (error) {
      console.error(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComment = createAsyncThunk(
  "comment/getComment",
  async (commentId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await commentService.getComment(commentId, token);
    } catch (error) {
      console.error(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getComments = createAsyncThunk(
  "comment/getComments",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      return await commentService.getComments(token);
    } catch (error) {
      console.error(error);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ commentId, content }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      console.log(content);
      return await commentService.updateComment(commentId, content, token);
    } catch (error) {
      console.log(error.message);
      (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await commentService.deleteComment(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment = action.payload;
      })

      .addCase(createComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.comment = null;
        state.message = action.payload;
      })

      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })

      .addCase(getComments.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.comments = [];
        state.message = action.payload;
      })

      .addCase(getComment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment = action.payload;
      })

      .addCase(getComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.comment = null;
        state.message = action.payload;
      })

      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comment = action.payload;
      })

      .addCase(updateComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.comment = null;
        state.message = action.payload;
      })

      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      })

      .addCase(deleteComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;

export default commentSlice.reducer;