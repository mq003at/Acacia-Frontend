import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { useNavigate } from 'react-router-dom';

import { CartItem } from '../../types/common';
import { addItemToCart } from '../../redux/reducers/cartReducer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ErrorIcon from '@mui/icons-material/Error';


const CartItemDetails: React.FC<{ cartItem: CartItem }> = (props) => {
  const user = useAppSelector((state) => state.userReducer.currentUser);
  const product = props.cartItem.product;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(props.cartItem.quantity);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };

  function handleUpdate() {
    if (product && quantity) dispatch(addItemToCart({ productId: product.id, quantity: quantity }));
  }

  function handleRemove() {
    if (product && quantity) dispatch(addItemToCart({ productId: product.id, quantity: quantity }));
  }

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <Card className="cart-details wrapper">
      <Grid container>
        <Grid item xs={4}>
          <Box paddingBottom={'2em'} paddingLeft={'1em'} paddingRight={'1em'}>
            <Slider {...settings}>
              {product.images.map((image) => (
                <div className="cart-details imgwrapper" key={`fullDetail-${image}`}>
                  <img src={image} alt={product.title} />
                </div>
              ))}
            </Slider>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box className="cart mainInfo" textAlign={'left'}>
            <Typography className="cart title">{product.title}</Typography>
            <Typography className="cart price">{product.price} EUR</Typography>
          </Box>
          <Box>
            <Typography className="cart description" variant="subtitle1" textAlign={'left'}>
              {product.description}
            </Typography>
          </Box>
          <Box className="cart buyout-container">
            <Box className="cart incBox" textAlign={'left'}>
              <Button onClick={handleDecrease}>-</Button>
              <TextField
                className="cart incInput"
                variant="outlined"
                value={quantity}
                type={'nummber'}
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <Button onClick={handleIncrease}>+</Button>
            </Box>
            <Button className="cart shopIcon" onClick={() => handleUpdate()}>
              <ShoppingCartIcon />
              UPDATE
            </Button>
            <Button className="cart removeIcon" onClick={() => handleRemove()}>
              <ErrorIcon style={{paddingRight: "5px"}}/>
                REMOVE
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItemDetails;
