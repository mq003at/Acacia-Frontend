import { Box, Button, ListItem, ListItemButton, ListItemText, MenuItem, Modal, TextField, Typography, Select } from '@mui/material';
import { useFormik } from 'formik';
import { Fragment, useState } from 'react';
import React from 'react';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { Category, CategoryAdd } from '../../types/common';
import { addCategoryToServer, deleteCategory, updateCategory } from '../../redux/reducers/categoryReducer';
import ModeEditIcon from '@mui/icons-material/ModeEdit';


const UpdateCategoryModal: React.FC<{ category: Category }> = (props) => {
    const category = props.category;
    const userToken = useAppSelector((state) => state.userReducer.accessToken?.token)
    const dispatch = useAppDispatch();
    const [openEdit, setEdit] = useState(false);

    const validationEdit = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        images: Yup.string().url('Image must be a valid URL').required('Image is required')
    });

    const editForm = useFormik({
        initialValues: {
            name: category.name,
            images: category.images[0],
        },
        onSubmit: (values) => {
            console.log("value", values)
            if (values.name && values.images && typeof userToken === 'string') {
                const update: Category = {
                    id: category.id,
                    name: values.name,
                    images: [values.images]
                }
                dispatch(updateCategory({ id: category.id, update: update, userToken: userToken }));
                setEdit(false);
            }
        },
        validationSchema: validationEdit
    });

    const handleDelete = () => {
        if (typeof userToken === 'string') {
            dispatch(deleteCategory({ id: category.id, userToken: userToken }))
        }
    }

    return (<Fragment>
        <ModeEditIcon className="special-icon" onClick={() => setEdit(true)} />
        <Modal open={openEdit} onClose={() => setEdit(false)}>
            <Box className="modal add-cat">
                <Typography className="heading">Update Category {category.name}</Typography>
                <form className="formik-form" onSubmit={editForm.handleSubmit}>
                    <TextField className="name-input" id="name" label="Name" {...editForm.getFieldProps('name')} helperText={editForm.errors.name ? editForm.errors.name : ''}
                        error={editForm.touched.name && editForm.errors.name !== undefined}
                        InputLabelProps={{ shrink: true }} />

                    <TextField className="images-input" id="images" label="Images" {...editForm.getFieldProps('images')} helperText={editForm.errors.images ? editForm.errors.images : ''}
                        error={editForm.touched.images && editForm.errors.images !== undefined}
                        InputLabelProps={{ shrink: true }} />

                    <Box className="inline-button">
                        <Button className="danger-decorated modal-button" onClick={() => handleDelete()}>Delete</Button>
                        <Button className="decorated modal-button" type="submit">
                            Update
                        </Button>
                        <Button className="decorated modal-button" onClick={() => setEdit(false)}>Cancel</Button>

                    </Box>
                </form>
            </Box>
        </Modal>
    </Fragment>)
}

export default UpdateCategoryModal;


