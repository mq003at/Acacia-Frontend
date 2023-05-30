import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().min(6, 'Password should be at least 6 characters').required('Password is required'),
  name: Yup.string().min(3, 'Name should be at least 3 characters').required('Name is required.'),
});

export const addProductSchema = Yup.object().shape({
  productName: Yup.string().min(3, 'Name should be at least 3 characters').required('Name is required'),
  productDescription: Yup.string().min(6, 'Description should be at least 6 characters').required('Description is required'),
  productPrice: Yup.number().positive('The number must be bigger than 0').required('Price is required'),
});
