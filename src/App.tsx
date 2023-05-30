import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/reduxHook';
import { fetchAllCategories } from './redux/reducers/categoryReducer';
import { fetchAllProducts } from './redux/reducers/productReducer';
import { ReactNotifications } from 'react-notifications-component';

import Error from './components/Basic/Error';
import Cart from './components/Cart/Cart';
import FrontPage from './components/FrontPage/FrontPage';
import Header from './components/Header/Header';
import ProductDetail from './components/Products/ProductDetails';
import ProductsList from './components/Products/ProductsList';
import LogUser from './components/Profile/LogUser';
import Profile from './components/Profile/Profile';

import './styles/css/index.css';
import 'react-notifications-component/dist/theme.css';
import { autoLogin } from './redux/reducers/userReducer';
import { fetchUserCart } from './redux/reducers/cartReducer';

const App = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.userReducer);

  // Get all products and categories available from the first page load
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());

    const localStorageToken = {
        token: localStorage.getItem('rememberMeToken'),
        expiration: localStorage.getItem('rememberMeExp'),
    };
    
    const expiration = new Date(localStorageToken.expiration as unknown as Date)
    const now = new Date();
    const timeDiff = (now.getTime() - expiration.getTime()) / (1000 * 60 * 60);
    if (localStorageToken.token && timeDiff < 700) dispatch(autoLogin(localStorageToken.token));

  }, [dispatch]);

  useEffect(() => {
    if (user.currentUser && user.accessToken) {
      dispatch(fetchUserCart({id: user.currentUser.id}));
    }
  }, [dispatch, user.accessToken, user.currentUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <ReactNotifications />
        <Header />
        <Routes>
          <Route path={'/'} element={<FrontPage />} />
          <Route path={'/home'} element={<FrontPage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/" element={<ProductsList />} />
          <Route path="/products/:category?/:id?" element={<ProductDetail />} />
          <Route path="/carts" element={<Cart />} />
          <Route path="/login" element={<LogUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
