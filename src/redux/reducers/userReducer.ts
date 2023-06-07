import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { addNotification } from '../../components/Functions/common';
import axiosInstance from '../../test/shared/sharedInstance';
import { AccountCredential, AccountCredentialResponse, User, UserReducer } from '../../types/user';


// Fetch all users from API (scappred. Will be replaced by fetchAllUsersName)
// export const fetchAllUsers = createAsyncThunk('fetchAllUsers', async () => {
//   try {
//     const res: AxiosResponse<User[] | Error, any> = await axiosInstance.get('users');
//     if (!(res.data instanceof Error)) return res.data;
//   } catch (e) {
//     const error = e as AxiosError;
//     addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
//   }
// });

export const addRememberToken = (token: string, exp: string): void => {
  localStorage.setItem('rememberMeToken', token);
  localStorage.setItem('rememberMeExp', exp);
};

// Sign up a user + testing params. Should work like props
export const addUser = createAsyncThunk('addUser', async (params: { user: User; purpose?: string; isRememberMe: boolean }, thunkAPI) => {
  try {
    const requestUser = {
      firstName: params.user.firstName,
      lastName: params.user.lastName,
      email: params.user.email,
      password: params.user.password,
      role: 'User',
      avatar: params.user.avatar,
    }
    console.log("req", requestUser);
    const res: AxiosResponse<AccountCredentialResponse | Error, any> = await axiosInstance.post('users/signup', requestUser);
    
    if (!(res.data instanceof Error)) {
      addNotification('Registration success', 'You are now logged in', 'success');
      if (params.isRememberMe && res.data.specialToken) addRememberToken(res.data.specialToken?.token, res.data.specialToken?.expiration);
      return res.data;
    }

    if (res.status === 400) addNotification('Registration Failure', res.data.message, 'danger');
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

export const autoLogin = createAsyncThunk('autoLogin', async (token: string, thunkAPI) => {
  try {
    const res: AxiosResponse<AccountCredentialResponse | Error, any> = await axiosInstance.post('users/auto-signin', token);
    if (!(res.data instanceof Error))
    {
      addNotification(`Welcome back ${res.data.user.firstName}.`, "", "success");
      return res.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// User Auth
export const authCredential = createAsyncThunk('authCredential', async (params: { account: AccountCredential; isRememberMe: boolean }, { dispatch }) => {
  try {
    const res: AxiosResponse<AccountCredentialResponse | Error, any> = await axiosInstance.post('users/signin', params.account);
    if (!(res.data instanceof Error)) {
      addNotification('Authorization Succeeds', 'You are now logging in', 'success');
      if (params.isRememberMe && res.data.specialToken) addRememberToken(res.data.specialToken?.token, res.data.specialToken?.expiration);
      return res.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    if (error.response) {
      // Server return that email or password is wrong
      addNotification('Invalid Authorization', 'Incorrect email or password', 'danger');
    } else addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Update User
export const updateUser = createAsyncThunk('updateUser', async (user: User) => {
  try {
    const res: AxiosResponse<User | Error, any> = await axiosInstance.put(`users/${user.id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      avatar: user.avatar,
    });
    if (!(res.data instanceof Error)) {
      addNotification('Update success', 'Your current information has been stored', 'success');
      return res.data;
    }
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
  }
});

// Validate emails. This method is not a part of reducer so you can use it anywhere
export const validateEmail = async (email: string): Promise<boolean> => {
  try {
    const res: AxiosResponse<{ isRegisterd: boolean } | Error, any> = await axiosInstance.post('/users/is-registered', {
      email: email,
    });
    if (!(res.data instanceof Error)) return res.data.isRegisterd;
    else return false;
  } catch (e) {
    const error = e as AxiosError;
    addNotification(`ERROR ${error.code}`, `${error.message}`, 'danger');
    return false;
  }
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {} as UserReducer,
  reducers: {
    logOutCurrentUser: (state) => {
      if (state.currentUser) {
        localStorage.removeItem('rememberMeToken');
        localStorage.removeItem('rememberMeExp');

        delete state.currentUser;
        delete state.accessToken;
        delete state.specialToken;

        addNotification('Logout successfully', 'You will be directed to Login Page', 'success');
      }
    },
  },
  extraReducers: (build) => {
    build
      .addCase(addUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload) return state;
        else {
          const res = action.payload;
          return { ...state, currentUser: res.user, accessToken: res.accessToken, specialToken: res.specialToken };
        }
      })

      .addCase(authCredential.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else {
          const res = action.payload;
          console.log(res)
          return { ...state, currentUser: res.user, accessToken: res.accessToken, specialToken: res.specialToken };        }
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else return { ...state, currentUser: action.payload };
      })

      .addCase(autoLogin.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError || !action.payload || !state) return state;
        else {
          const res = action.payload;
          console.log(res)
          return { ...state, currentUser: action.payload.user, accessToken: action.payload.accessToken, specialToken: action.payload.specialToken };
        }
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logOutCurrentUser } = userSlice.actions;
