import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addNotification } from '../../components/functions/common';
import { Cart, CartReducer, CartRequest } from '../../types/common';
import axiosInstance from '../../test/shared/sharedInstance';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { RootState } from '../store';

export const fetchUserCart = createAsyncThunk('fetchUserCart', async ({ id, receivedToken }: { id: number; receivedToken?: string }, { getState }) => {
  try {
    let token = '';
    if (receivedToken) token = receivedToken;
    else {
      const state = getState() as RootState;
      token = state.userReducer.accessToken?.token || '';
    }

    console.log('token', token);

    if (token === '') {
      addNotification('Error', `You have to login first to use this function.`, 'danger');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res: AxiosResponse<Cart, any> = await axiosInstance.get(`carts/${id}`, { headers });
      return res.data;
    }
  } catch (e: any) {
    const error = e as AxiosError;
    const message = JSON.stringify(error.response?.data) || error.message;
    addNotification('Failure', message, 'danger');
  }
});

export const addItemToCart = createAsyncThunk('addItemToCart', async ({ productId, quantity }: CartRequest, { getState }) => {
  try {
    const state = getState() as RootState;
    const token = state.userReducer.accessToken?.token;
    const userId = state.userReducer.currentUser?.id;

    if (!token) {
      addNotification('Error', `You have to login first to use this function.`, 'danger');
      return;
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res: AxiosResponse<Cart, any> = await axiosInstance.post(`carts/${userId}/add-item`, { productId: productId, quantity: quantity }, { headers });
      addNotification('Cart updated', `Your cart's status has been changed.`, 'success');
      return res.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    const message = JSON.stringify(error.response?.data) || error.message;
    addNotification('Failure', message, 'danger');
  }
});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: { updatedAt: '', token: '' } as CartReducer,
  reducers: {
    // Token assigns
    updateToken: (state, action) => {
      if (!action.payload) return state;
      else return { ...state, token: action.payload };
    },

    // Return the search product
    extraCart: (state, action) => {
      return { ...state, cartSearchResult: action.payload };
    },

    // Switch functionality
    switchCart: (state, action) => {
      return { ...state, type: action.payload.type, extras: action.payload };
    },
  },

  extraReducers: (build) => {
    build.addCase(addItemToCart.fulfilled, (state, action) => {
      if (!action.payload || axios.isAxiosError(action.payload)) return state;
      else return { ...state, cart: action.payload.cartItems };
    });
    build.addCase(fetchUserCart.fulfilled, (state, action) => {
      if (!action.payload || axios.isAxiosError(action.payload)) return state;
      else return { ...state, cart: action.payload.cartItems, updatedAt: action.payload.updatedAt || '' };
    });
  },
});

export const cartReducer = cartSlice.reducer;
export const { extraCart, switchCart } = cartSlice.actions;
