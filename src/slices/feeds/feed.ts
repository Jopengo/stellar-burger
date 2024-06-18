import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';

export interface FeedsState {
  feeds: TOrder[];
  isLoading: boolean;
  error: string;
}

export const initialState: FeedsState = {
  feeds: [],
  isLoading: false,
  error: ''
};

export const fetchFeeds = createAsyncThunk('fetchFeeds', getFeedsApi);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (sliceState) => sliceState.feeds,
    selectIsDataLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
      });
  }
});

export const { selectFeeds, selectIsDataLoading } = feedsSlice.selectors;
export default feedsSlice.reducer;
