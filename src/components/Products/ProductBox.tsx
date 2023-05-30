import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductPlacementProps } from '../../types/props';
import SaleIcon from '../Basic/SaleIcon';
import { useState } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';

const ProductBox: React.FC<ProductPlacementProps> = (props) => {
  const navigate = useNavigate();

  const { size, product, isOnSale, isHideDescription } = props;
  const baseSize = [250, 25, 12];
  const newSize = baseSize.map((s) => (s * size) / 100);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigate(`/products/${product.category.name}/${product.id}`);
  };

  const handleBuyNowClick = () => {
    // Handle buy now click event
  };
  return (
    <Flipper flipKey={isHovered}>
      <Card sx={{ maxWidth: newSize[0] }} className="product-card" onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Flipped flipId="productimg">
          <Box className={'img-wrapper ' + isHovered}>
            <CardMedia className={'productimg ' + isOnSale + ' one'} component="img" height={'250px'} width={'300px'} image={product.images[0]} alt={product.title} />
            <CardMedia className={'productimg ' + isOnSale + ' two'} component="img" height={'250px'} width={'300px'} image={product.images[1]} alt={product.title} />
            {isOnSale && <SaleIcon size={25} />}
          </Box>
        </Flipped>

        <CardContent className="card-content">
          {' '}
          <Typography className="title" variant="h2" sx={{ fontSize: size !== 100 ? '20px' : '24px' }} color="text.primary" fontWeight={'bold'}>
            {product.title}
          </Typography>
          <Typography className="price" sx={{ fontSize: size !== 100 ? '20px' : '24px' }} color="text.primary">
            {product.price + ' EUR'}
          </Typography>
          {!isHideDescription && (
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          )}
          <Flipped flipId="buyNowBtn">
            <Box className={'product-button ' + isHovered.toString()}>
              {/* <Button variant="contained" onClick={handleBuyNowClick} sx={{backgroundColor: 'purple'}}>
                DETAILS
              </Button> */}
              <Button className={isHovered.toString()} variant="contained" onClick={handleBuyNowClick}>
                BUY NOW
              </Button>
            </Box>
          </Flipped>
        </CardContent>
      </Card>
    </Flipper>
  );
};

export default ProductBox;
