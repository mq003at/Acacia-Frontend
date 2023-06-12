import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { addNotification } from '../../components/functions/common';
import axiosInstance from '../../test/shared/sharedInstance';
import { Category, CategoryAdd, UpdatedCategory } from '../../types/common';

// Fetch all categories
export const fetchAllCategories = createAsyncThunk('fetchAllCategory', async () => {
  try {
    const res: AxiosResponse<Category[], any> = await axiosInstance.get('categories');
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Post in a category
export const addCategoryToServer = createAsyncThunk('createCategoryToServer', async ({ catAdd, token }: { catAdd: CategoryAdd; token: string }) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const res: AxiosResponse<Category, any> = await axiosInstance.post('categories', { name: catAdd.name, images: [catAdd.images[0]] }, { headers });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    console.log('e', error);
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Update category
export const updateCategory = createAsyncThunk('updateCategory', async ({ id, update, userToken }: UpdatedCategory) => {
  try {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const res: any = await axiosInstance.put(`categories/${id}`, { name: update.name, images: update.images }, { headers });
    return res.data;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Delete Category
export const deleteCategory = createAsyncThunk('deleteCategory', async ({ id, userToken }: { id: number; userToken: string }) => {
  try {
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    console.log("be4", id, userToken);
    const res: AxiosResponse<{ message: string }, any> = await axiosInstance.delete(`categories/${id}`, { headers });
    console.log('res', res);
    if (res.data.message) {
      const res2: AxiosResponse<Category[], any> = await axiosInstance.get('categories');
      console.log('res2', res2);
      return res2.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

const initialState: Category[] = [];
const categorySlice = createSlice({
  name: 'categorySlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload === undefined) return state;
        else return action.payload;
      })

      .addCase(addCategoryToServer.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || action.payload === undefined) return state;
        else return [...state, action.payload];
      })

      .addCase(updateCategory.fulfilled, (state, action) => {
        if (!(action.payload instanceof AxiosError) && action.payload !== undefined) {
          const data: Category = action.payload;
          return state.map((cat) => (cat.id === data.id ? data : cat));
        } else return state;
      })

      .addCase(deleteCategory.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload === undefined) return state;
        else return action.payload;
      });
  },
});

export const categoryReducer = categorySlice.reducer;
