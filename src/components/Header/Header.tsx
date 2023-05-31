import { AppBar, Container, Toolbar } from '@mui/material';

import LeftNav from './LeftNav';
import MiddleNav from './MiddleNav';
import RightNav from './RightNav';


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
