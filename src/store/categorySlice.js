// src/store/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example of async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories'); // actual API URL
    const data = await response.json();
    return data;
  }
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  async (category) => {
    const response = await fetch('https://api.escuelajs.co/api/v1/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
  }
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ id, updatedCategory }) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCategory),
    });
    const data = await response.json();
    return data;
  }
);

export const removeCategory = createAsyncThunk(
  'categories/removeCategory',
  async (id) => {
    const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
      method: 'DELETE',
    });
    return id; // Return id as it's sufficient for deleting from the state
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category.id !== action.payload);
      });
  },
});

export default categorySlice.reducer;
