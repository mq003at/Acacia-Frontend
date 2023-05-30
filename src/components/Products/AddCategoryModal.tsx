import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';

const AddCategoryModel: React.FC<{ open: boolean; onClose: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  const [error, setError] = useState<string | undefined>(undefined);

  const categoryForm = useFormik({
    initialValues: {
      name: 'Category Name',
      images: '',
    },
    onSubmit: (values) => {
      if (values.name) {
      }
    },
  });

  return (
    <Modal {...props}>
      <Box className="category-add wrapper">
        <form className="formik-form" onSubmit={categoryForm.handleSubmit}>
          <TextField className="name-input" id="name" label="Name" {...categoryForm.getFieldProps('name')} />
          <TextField className="images-input" id="images" label="Images" {...categoryForm.getFieldProps('images')} />
          {error && <Typography>{error}</Typography>}
          <Box className="inline-button">
            <Button className="decorated" type="submit">
              Submit
            </Button>
            <Button className="decorated" onClick={() => props.onClose}></Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCategoryModel;
