import { Card, Box, Typography, Grid, Button, TextField } from '@mui/material';
import { Product } from '../../types/common';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/reduxHook';
import { addItemToCart } from '../../redux/reducers/cartReducer';

const ProductFullDetails: React.FC<{ catName: string; product: Product;}> = (props) => {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
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

  function handleButton() {
    if (product && quantity) dispatch(addItemToCart({productId: product.id, quantity: quantity}));
    else console.log("fail")
  }

  return (
    <Card className="product-f-details wrapper">
      <Box className="product-f-details show-cat" textAlign={'left'}>
        <Typography marginLeft={'1.25em'} padding={'0.5em 0.5em'} color="text.secondary">
          {'>'} {product.category.name}
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={4}>
          <Box paddingBottom={'2em'} paddingLeft={'1em'} paddingRight={'1em'}>
            <Slider {...settings}>
              {product.images.map((image) => (
                <div className="product-f-details-imgwrapper" key={`fullDetail-${image}`}>
                  <img src={image} alt={product.title} />
                </div>
              ))}
            </Slider>
          </Box>
        </Grid>

        <Grid item xs={8}>
          <Box className="product-f-details mainInfo" textAlign={'left'}>
            <Typography className="product-f-details title">{product.title}</Typography>
            <Typography className="product-f-details price">{product.price} EUR</Typography>
          </Box>
          <Box>
            <Typography className="product-f-details description" variant="subtitle1" textAlign={'left'}>
              {product.description}
            </Typography>
          </Box>
          <Box className="product-f-details buyout-container">
            <Box className="product-f-details incBox" textAlign={'left'}>
              <Button onClick={handleDecrease}>-</Button>
              <TextField
                className="product-f-details incInput"
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
            <Button className="product-f-details shopIcon" onClick={() => handleButton()}>
              <ShoppingCartIcon />
              BUY NOW
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductFullDetails;

