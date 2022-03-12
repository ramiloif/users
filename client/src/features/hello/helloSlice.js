import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHello } from './helloAPI';

const initialState = {
  server: 'null',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getHelloAction = createAsyncThunk(
  'counter/getHello',
  async () => {
    const response = await getHello();
    // The value we return becomes the `fulfilled` action payload
    console.log(response.data)
    return response.data.dick;
  }
);

export const helloSlice = createSlice({
  name: 'hello',
  initialState,
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getHelloAction.fulfilled, (state, action) => {
        state.server = action.payload;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHello = (state) => state.hello.server;


export default helloSlice.reducer;
