import { Fragment, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Modal, Typography } from "@mui/material";
import { Product } from "../../types/common";
import React from 'react';
import { useAppDispatch } from "../../hooks/reduxHook";
import { deleteProduct } from "../../redux/reducers/productReducer";
import { useNavigate } from "react-router-dom";

const DeleteProductModal: React.FC<{ product: Product, token: string }> = (props) => {
    const product = props.product;
    const token = props.token;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [openDel, setDel] = useState(false);

    const handleDelete = () => {
        if (product && token) {
            console.log(product, token)
            dispatch(deleteProduct({ id: product.id, userToken: token }))
            navigate("/products");
        }
    }
    return (
        <Fragment>
            <Button variant="contained" color="error" onClick={() => setDel(true)}>
                <DeleteIcon />
                Delete
            </Button>
            <Modal open={openDel} onClose={() => setDel(false)}>
                <Box className="modal add-cat">
                    <Typography className="heading">Delete {product.title}</Typography>
                    <Typography>This will make an irreversible change.</Typography>
                    <Box sx={{ marginTop: "2em" }}>                    
                        <Button variant="contained" color="error" onClick={() => handleDelete()}>Delete</Button>
                        <Button className="decorated" sx={{ marginLeft: "2em"}} onClick={() => setDel(false)}>Cancel</Button>
                    </Box>

                </Box>
            </Modal>
        </Fragment>
    )
}

export default DeleteProductModal;
