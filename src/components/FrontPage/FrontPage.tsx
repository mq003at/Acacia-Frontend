import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHook';
import { Product } from '../../types/common';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import girlShoppingImg from '../../assets/happy_girl_shopping.jpeg';
import { Box, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Testing splitting up components into many small components
const FrontPage: React.FC = () => {
  const selectUser = useAppSelector((state) => state.userReducer);
  const [offers, setOffers] = useState<Product[]>([]);

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  useEffect(() => {}, []);

  // useEffect(() => {
  //   if (selectUser.specialOffers) setOffers(selectUser.specialOffers);
  // }, [selectUser]);

  return (
    <div className="frontpage">
      {/* <div className="front-promotionImage"> */}
      {/* <Slider {...settings}>
          {offers.map((offer) => (
            <div className="front-imgwrapper" key={offer.id}>
              <img src={offer.images[0]} alt={offer.title} />
            </div>
          ))}
        </Slider>
      </div>
      <SpecialOffers offers={offers} /> */}

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
