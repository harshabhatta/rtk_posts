import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  error: '',
};

const GET_USERS_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  try {
    const response = await axios.get(GET_USERS_URL);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = state.users.slice().concat(action.payload);
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.users = [];
      state.error = action.payload;
    });
  },
  // different way of writing extra reducers
  //   extraReducers: {
  //     [getUsers.fulfilled]: (state, action) =>
  //       state.users.slice().concat(action.payload),
  //     [getUsers.rejected]: (state, action) => (state.error = action.payload),
  //   },
});

export default usersSlice.reducer;
