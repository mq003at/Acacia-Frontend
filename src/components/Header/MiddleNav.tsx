import { useRef } from 'react';
import { FormControl, MenuItem, Select, InputBase, Box, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { middleNavStyles as style } from '../../styles/mui/HeaderStyles';
import { useNavigate } from 'react-router-dom';

function MiddleNav() {
  const inputRef = useRef<HTMLInputElement | null> (null);
  const navigate = useNavigate();
  const handleSearch = () => {
    if (inputRef.current?.value) navigate(`products?search=${inputRef.current.value}`);
  }

  return (
    <Box className={'search-container'} sx={style.searchContainer}>
      <FormControl className={'category-select'} sx={style.categorySelect}>
        <Select className={'select-wrapper'} displayEmpty id="category-select" defaultValue="" label="Category">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="shirts">Shirts</MenuItem>
          <MenuItem value="pants">Pants</MenuItem>
        </Select>
      </FormControl>
      <InputBase inputRef={inputRef} className={'header search-input'} placeholder="What are you buying for today?" inputProps={{ 'aria-label': 'search for products' }} sx={style.searchInput} />
      <Button type="submit" className={'header search-button'} sx={style.searchButton} aria-label="search" onClick={() => handleSearch()}>
        <SearchIcon />
      </Button>
    </Box>
  );
}

export default MiddleNav;
