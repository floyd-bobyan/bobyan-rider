import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  success: false,
  data: null,
  error: null,
};

// Async thunk for GET request
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (params, { rejectWithValue }) => {
    try {
      // Optional: build query string if params are passed (e.g. ?email=test@mail.com)
      const query = params ? `?${new URLSearchParams(params).toString()}` : '';

      const response = await fetch(`/api/login${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, // Uncomment if your GET route needs a token
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.message || 'Request failed');
      }

      return result;
    } catch (err) {
      return rejectWithValue(err.message || 'Network error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetState } = authSlice.actions;
export default authSlice.reducer;
