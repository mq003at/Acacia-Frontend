import { Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { updateUser } from '../../redux/reducers/userReducer';
import { useNavigate } from 'react-router-dom';
import { logOutCurrentUser } from '../../redux/reducers/userReducer';
import { profileSchema } from './ProfileSchema';

const UserDetails: React.FC = () => {
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isUpdateMode, changeUpdateMode] = useState(false);

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const profileForm = useFormik({
    initialValues: {
      email: currentUser?.email,
      password: currentUser?.password,
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
    },
    onSubmit: (values) => {
      if (currentUser && values.firstName && values.lastName && values.email && values.password) {
        dispatch(
          updateUser({
            id: currentUser.id,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            role: currentUser.role,
            avatar: currentUser.avatar,
          })
        );
      }
    },
    validationSchema: profileSchema,
  });

  const UpdateUser: React.FC = () => {
    return (
      <CardContent>
        <form className="profile__profileForm" onSubmit={profileForm.handleSubmit}>
          <CardMedia
            component="img"
            sx={{ width: 150 }}
            image={currentUser?.avatar ? currentUser.avatar : `https://ui-avatars.com/api/?name=${currentUser?.firstName} ${currentUser?.lastName}&size=450`}
            alt={currentUser?.firstName}
          ></CardMedia>
          <TextField
            className="profile__textField"
            id="firstName"
            label="First Name"
            {...profileForm.getFieldProps('firstName')}
            helperText={profileForm.errors.firstName ? profileForm.errors.firstName : ''}
            error={profileForm.touched.firstName && profileForm.errors.firstName !== undefined}
          />
          <TextField
            className="profile__textField"
            id="lastName"
            label="LastName"
            {...profileForm.getFieldProps('lastName')}
            helperText={profileForm.errors.lastName ? profileForm.errors.lastName : ''}
            error={profileForm.touched.lastName && profileForm.errors.lastName !== undefined}
          />
          <TextField
            id="email"
            label="Email"
            className="profile__textField"
            {...profileForm.getFieldProps('email')}
            helperText={profileForm.errors.email ? profileForm.errors.email : ''}
            error={profileForm.touched.email && profileForm.errors.email !== undefined}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            className="profile__textField"
            {...profileForm.getFieldProps('password')}
            helperText={profileForm.errors.password ? profileForm.errors.password : ''}
            error={profileForm.touched.password && profileForm.errors.password !== undefined}
          />
          <Grid container spacing={'1.5em'}>
            <Grid className="profile__grid" item xs={6}>
              <Button className="decorated" type="submit">Update</Button>
            </Grid>
            <Grid className="profile__grid" item xs={6}>
              <Button className="decorated" onClick={() => changeUpdateMode(false)}>Cancel</Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    );
  };

  const UserInfo: React.FC = () => {
    const handleLogout = () => {
      dispatch(logOutCurrentUser());
    };

    return (
      <CardContent>
        <CardMedia
          component="img"
          sx={{ width: 150, alignItems: 'center' }}
          image={currentUser?.avatar ? currentUser.avatar : `https://ui-avatars.com/api/?name=${currentUser?.firstName} ${currentUser?.lastName}&size=450`}
          alt={currentUser?.firstName}
        ></CardMedia>

        <Box className="profile__singleInfo">
          <Typography>First Name: </Typography>
          <Typography> {currentUser?.firstName}</Typography>
        </Box>
        <Box className="profile__singleInfo">
          <Typography>Last Name: </Typography>
          <Typography> {currentUser?.lastName}</Typography>
        </Box>
        <Box className="profile__singleInfo">
          <Typography>Email: </Typography>
          <Typography> {currentUser?.email}</Typography>
        </Box>
        <Box className="profile__singleInfo">
          <Typography>Join Since: </Typography>
          <Typography> {currentUser?.creationAt?.substring(0, 10)}</Typography>
        </Box>
        <Box className="profile__singleInfo">
          <Typography> Last updated:</Typography>
          <Typography> {currentUser?.updatedAt?.substring(0, 10)}</Typography>
        </Box>
        <Box className="profile__singleInfo">
          <Button className="decorated" onClick={() => changeUpdateMode(true)}>UPDATE PROFILE</Button>
          <Button className="decorated" onClick={handleLogout}>LOGOUT</Button>
        </Box>
      </CardContent>
    );
  };

  return <Card className="profile__card">{isUpdateMode ? <UpdateUser /> : <UserInfo />}</Card>;
};
export default UserDetails;
