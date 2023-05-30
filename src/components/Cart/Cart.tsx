import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../hooks/reduxHook';
import { useNavigate } from 'react-router-dom';
import CartItemDetails from '../Products/CartItemDetails';

const Cart: React.FC = () => {
  const cart = useAppSelector((store) => store.cartReducer);
  const user = useAppSelector((store) => store.userReducer.currentUser)
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined || cart.cart === undefined) navigate("/login");    
  }, [navigate, user, cart.cart])

  return (
    <Box className="cart__wrapper">
      {cart.cart?.length === 0 ? <Typography>Your cart is empty.</Typography> : (
        cart.cart?.map(item => <CartItemDetails cartItem={item} />)
      )}      
    </Box>
  );
};

export default Cart;
