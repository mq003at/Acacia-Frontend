import { Box, Button, Menu, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHook';

const RightNav = () => {
  const categories = useAppSelector((state) => state.categoryReducer);
  const users = useAppSelector((state) => state.userReducer);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUser = () => {
    if (users.currentUser === null) navigate("login");
    else navigate("profile");
  }

  useEffect(() => {
    console.log('cat', categories);
  });

  return (
    <Box className={'rightNav'}>
      <Button className={'productNavButton'} variant="outlined" onClick={handleClick}>
        Products
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate('products');
            handleClose();
          }}
        >
          All Products
        </MenuItem>

        {categories.map((cat) => (
          <MenuItem
            key={`navi-${cat.name}-${cat.id}`}
            onClick={() => {
              navigate(`products?category=${cat.name}`);
              handleClose();
            }}
          >
            {cat.name}
          </MenuItem>
        ))}
      </Menu>
      <Button className={''} variant="outlined" onClick={() => {handleClose(); navigate("/about")}}>
        About Us
      </Button>
      <Button className={''} variant="outlined" onClick={() => {handleClose(); handleUser();}}>
        Profile
      </Button>
    </Box>
  );
};

export default RightNav;
