import { useEffect } from 'react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import girlShoppingImg from '../../assets/happy_girl_shopping.jpeg';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Testing splitting up components into many small components
const FrontPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="frontpage">
      <img alt="front-page-img" src={girlShoppingImg}></img>
      <Box className={'promotion'}>
        <Box className={'promotion__1'}>WITHIN ACACIA</Box>
        <Box className={'promotion__2'}>Every wishes will come true</Box>
        <Box className={'promotion__3'}><Button className="decorated" onClick={() => navigate("/products")}>SHOP NOW</Button></Box>
      </Box>
    </div>
  );
};

export default FrontPage;
