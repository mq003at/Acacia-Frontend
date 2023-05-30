import { Box, Button, Card, CardContent, Grid } from '@mui/material';
import UserDetails from './UserDetails';
import Cart from '../Cart/Cart';

const Profile: React.FC = () => {
  return (
    <Box className="profile">
      <Box className="wrapper">
        <CardContent>
          <Grid container spacing={2} className="grid-item">
            <Grid item xs={12} md={9}>
              <Cart />
            </Grid>
            <Grid item xs={12} md={3} className="grid-item" style={{ maxWidth: '500px' }}>
              <UserDetails />
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Box>
  );
};

export default Profile;
