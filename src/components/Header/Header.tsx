import { AppBar, Box, Button, Container, Grid, InputAdornment, TextField, Toolbar } from '@mui/material';
import { useState } from 'react';
// import HeaderButton from './HeaderButtons';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { Product } from '../../types/common';
import { extraCart, switchCart } from '../../redux/reducers/cartReducer';
import LeftNav from './LeftNav';
import MiddleNav from './MiddleNav';
import RightNav from './RightNav';

// import Banner from './Banner';

// const Header: React.FC = () => {
//   const navButtonArray = ['PRODUCTS', 'PROFILE', 'CARTS'];
//   const [searchTerm, setSearchTerm] = useState('');
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const product = useAppSelector((state) => state.productReducer);

//   const handleSearch = () => {
//     const result = product.filter((product: Product) => product.title.includes(searchTerm));
//     dispatch(extraCart(result));
//     dispatch(switchCart({ type: 'search', extras: searchTerm }));
//     navigate('carts');
//   };

//   const makeNavButton = (text: string) => {
//     return (
//       <Grid item xs={2} key={`navButton-${text}`}>
//         <HeaderButton text={text}></HeaderButton>
//       </Grid>
//     );
//   };

//   const makeSearchNav = () => {
//     return (
//       <Grid item xs={4}>
//         <Box className="search-bar">
//           <TextField
//             variant="outlined"
//             value={searchTerm}
//             onChange={(event) => setSearchTerm(event.target.value)}
//             InputProps={{
//               startAdornment: <InputAdornment position="start">Search</InputAdornment>,
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Button onClick={handleSearch}>
//                     <SearchIcon />
//                   </Button>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </Grid>
//     );
//   };

//   return (
//     <AppBar position="fixed">
//       <Grid container display="flex" flexDirection="row" alignItems="center" bgcolor="white">
//         <Grid item xs={14}>
//           <Banner />
//         </Grid>
//         <Grid className="navBar-functionrow" item xs={14}>
//           <Grid container alignItems="center" width={'80%'}>
//             {makeNavButton('HOME')}
//             {makeSearchNav()}
//             {navButtonArray.map((button) => makeNavButton(button))}
//           </Grid>
//         </Grid>
//       </Grid>
//     </AppBar>
//   );
// };

// export default Header;

const Header: React.FC = () => {
  return (
    <AppBar className="header" position="fixed">
      <Container className="container">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <LeftNav />
          <MiddleNav />
          <RightNav />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
