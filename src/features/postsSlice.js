import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: '',
};

const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const response = await axios.get(POST_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const savePost = createAsyncThunk('posts/savePost', async (postBody) => {
  try {
    const response = await axios.post(POST_URL, postBody);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addReaction: (state, action) => {
      const post = state.posts.find((post) => post.id === action.payload.id);
      post.reaction[action.payload.reaction]++;
    },
    addPost: {
      reducer: (state, action) => {
        state.posts.push(action.payload);
      },
      prepare: ({ userId, title, body }) => {
        const id = nanoid();
        return {
          payload: {
            id,
            userId,
            title,
            body,
            reaction: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
            },
          },
        };
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.posts = action.payload.map((post) => {
        post.reaction = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
        };
        return post;
      });
      state.status = 'success';
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.status = 'error';
      state.posts = [];
      state.error = action.payload;
    });
    builder.addCase(savePost.fulfilled, (state, action) => {
      const payload = { ...action.payload };
      payload.reaction = {
        thumbsUp: 0,
        wow: 0,
        heart: 0,
      };
      state.posts.push(payload);
      state.status = 'success';
    });
    builder.addCase(savePost.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    });
  },
});

export const { addReaction, addPost } = postsSlice.actions;

export default postsSlice.reducer;
