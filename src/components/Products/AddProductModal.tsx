import { Box, Button, ListItem, ListItemButton, ListItemText, MenuItem, Modal, TextField, Typography, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { Category, CategoryAdd, ProductAdd } from '../../types/common';
import { addCategoryToServer } from '../../redux/reducers/categoryReducer';
import { addProductToServer } from '../../redux/reducers/productReducer';

const AddProductModal: React.FC<{ catList: Category[] }> = (props) => {
    const dispatch = useAppDispatch();
    const catList = props.catList;
    const userToken = useAppSelector((state) => state.userReducer.accessToken?.token)

    const [openCat, setCat] = useState(false);
    const [openProd, setProd] = useState(false);

    const validationCat = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        images: Yup.string().url('Image must be a valid URL').required('Image is required')
    });

    const productSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number()
            .typeError('Price must be a number')
            .required('Price is required')
            .positive('Price must be a positive number'),
        description: Yup.string().required('Description is required'),
    });


    const categoryForm = useFormik({
        initialValues: {
            name: 'Category Name',
            images: '',
        },
        onSubmit: (values) => {
            if (values.name && values.images && typeof userToken === 'string') {
                const catAdd: CategoryAdd = {
                    name: values.name,
                    images: [values.images]
                }
                dispatch(addCategoryToServer({catAdd: catAdd, token: userToken}));
            }
        },
        validationSchema: validationCat
    });

    const productForm = useFormik({
        initialValues: {
            name: 'Product Name',
            catId: 1,
            image1: '',
            image2: '',
            image3: '',
            description: '',
            price: 1
        },
        onSubmit: (values) => {
            if (values.name && values.image1 && values.image2 && values.image3 && values.description && values.price && values.catId && typeof userToken === 'string') {
                const prodAdd: ProductAdd = {
                    title: values.name,
                    images: [values.image1, values.image2, values.image3],
                    price: values.price,
                    categoryId: values.catId,
                    description: values.description
                }
                dispatch(addProductToServer({product: prodAdd, userToken: userToken}))
                setProd(false);
            }
        },
        validationSchema: productSchema
    });

    return (
        <ListItem sx={{ display: 'block' }} key={`list-adminCommand`} disablePadding>
            <ListItemButton onClick={() => setCat(true)}>
                <ListItemText primary={"Add Category"} />
            </ListItemButton>
            <Modal open={openCat} onClose={() => setCat(false)}>
                <Box className="modal add-cat">
                    <Typography className="heading">Add More Category</Typography>
                    <form className="formik-form" onSubmit={categoryForm.handleSubmit}>
                        <TextField className="name-input" id="name" label="Name" {...categoryForm.getFieldProps('name')} helperText={categoryForm.errors.name ? categoryForm.errors.name : ''}
                            error={categoryForm.touched.name && categoryForm.errors.name !== undefined}
                            InputLabelProps={{ shrink: true }} />

                        <TextField className="images-input" id="images" label="Images" {...categoryForm.getFieldProps('images')} helperText={categoryForm.errors.images ? categoryForm.errors.images : ''}
                            error={categoryForm.touched.images && categoryForm.errors.images !== undefined}
                            InputLabelProps={{ shrink: true }} />

                        <Box className="inline-button">
                            <Button className="decorated modal-button" type="submit">
                                Submit
                            </Button>
                            <Button className="decorated modal-button" onClick={() => setCat(false)}>Cancel</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>

            <ListItemButton onClick={() => setProd(true)}>
                <ListItemText primary={"Add Product"} />
            </ListItemButton>
            <Modal open={openProd} onClose={() => setProd(false)}>
                <Box className="modal add-cat">
                    <Typography className="heading">Add More Product</Typography>
                    <form className="formik-form" onSubmit={productForm.handleSubmit}>
                        <TextField className="name-input" id="name" label="Name" {...productForm.getFieldProps('name')} helperText={productForm.errors.name ? productForm.errors.name : ''}
                            error={productForm.touched.name && productForm.errors.name !== undefined}
                            InputLabelProps={{ shrink: true }} />
                        <TextField className="price-input" id="price" label="Price" {...productForm.getFieldProps('price')} helperText={productForm.errors.price ? productForm.errors.price : ''}
                            error={productForm.touched.price && productForm.errors.price !== undefined}
                            InputLabelProps={{ shrink: true }} />
                        <TextField className="description-input" id="description" label="Description" {...productForm.getFieldProps('description')} helperText={productForm.errors.description ? productForm.errors.description : ''}
                            error={productForm.touched.description && productForm.errors.description !== undefined}
                            InputLabelProps={{ shrink: true }} />
                        <Select
                            label="catId"
                            id="catId"
                            value={productForm.values.catId}
                            onChange={(e) => productForm.setFieldValue('catId', e.target.value)}
                            className="cat-input"
                        >
                            {catList.map((category) => (
                                <MenuItem key={`prod-modal-${category.id}`} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField className="images-input" id="image1" label="image1" {...productForm.getFieldProps('image1')} 
                            InputLabelProps={{ shrink: true }} />
                        <TextField className="images-input" id="image2" label="image2" {...productForm.getFieldProps('image2')} 
                            InputLabelProps={{ shrink: true }} />
                        <TextField className="images-input" id="image3" label="image3" {...productForm.getFieldProps('image3')} 
                            InputLabelProps={{ shrink: true }} />

                        <Box className="inline-button">
                            <Button className="decorated modal-button" type="submit">
                                Submit
                            </Button>
                            <Button className="decorated modal-button" onClick={() => setProd(false)}>Cancel</Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </ListItem >

    );
};

export default AddProductModal;
