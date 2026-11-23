import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  data: [], // earnings rows
  error: null,
};

export const fetchEarnings = createAsyncThunk(
  'earnings/fetchEarnings',
  async (driverId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `/api/earnings?id=${encodeURIComponent(driverId)}`
      );

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok) {
        return rejectWithValue(result.error || 'Request failed');
      }

      return result.rows;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const earningsSlice = createSlice({
  name: 'earnings',
  initialState,
  reducers: {
    resetEarnings() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarnings.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetEarnings } = earningsSlice.actions;
export default earningsSlice.reducer;