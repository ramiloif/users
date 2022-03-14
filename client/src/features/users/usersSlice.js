import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './users-api';

const initialState = {
  list: [],
  isCreateUserFormOpen: false,
  refresh: false,
};

export const fetchUsersAction = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsers();
    console.log(response.data)
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleCreateForm: (state) => {
      state.isCreateUserFormOpen = !state.isCreateUserFormOpen;
    },
    toggleRefresh: (state) => {
      state.refresh = !state.refresh;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAction.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});

export const { toggleCreateForm, toggleRefresh } = usersSlice.actions;

export const selectUsers = (state) => state.users.list;

export const selectIsCreateUserFormOpen = (state) => state.users.isCreateUserFormOpen;

export const selectRefresh = (state) => state.users.refresh;


export default usersSlice.reducer;
