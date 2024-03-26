import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';
import { useAddEmployeeMutation, useGetEmployeeQuery } from '../redux/reducers/apiSlice';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const schema = yup.object().shape({
  employeeId: yup.string().required('Employee ID is required').min(1, 'Employee ID cannot be negative'),
  location: yup.string().required('Location is required'),
  title: yup.string().required('Title is required'),
  department: yup.object().shape({
    name: yup.string().required('Department name is required'),
    jobTitle: yup.string().required('Department job title is required'),
  }),
});

const PopupDialog = ({ open, onClose }) => {
  const [employeeData, setEmployeeData] = useState({
    employeeId: '',
    location: '',
    title: '',
    image: null, // Change to null
    department: {
      name: '',
      jobTitle: ''
    },
  });

  const [addEmployee] = useAddEmployeeMutation();
  const { refetch: refetchEmployees } = useGetEmployeeQuery();
  const [errors, setErrors] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');

  const validateForm = async () => {
    try {
      await schema.validate(employeeData, { abortEarly: false })
      setErrors({});
      return true;
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach(error => {
        errors[error.path] = error.message;
      });
      setErrors(errors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if(await validateForm()){
    try {
     const response= await addEmployee(employeeData)
        if(response?.data?.status === 200){
          setAlertType('success');
        }else{
          setAlertType('error')
        }
      // Reset the form or close the dialog after successful submission
      setEmployeeData({
        employeeId: '',
        location: '',
        title: '',
        image: null, // Reset file state
        department: {
          name: '',
          jobTitle: ''
        }
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Error:', error.message);
        // Handle other types of errors
      }
    } finally {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      onClose();
      refetchEmployees();
    }
  }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setEmployeeData(prevData => ({
      ...prevData,
      image: selectedFile // Update image field with selected file
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData(prevData => ({
      ...prevData,
      [name]: value,
      department: {
        ...prevData.department,
        [name]: value,
      }
    }));
    setErrors({ ...errors, [name]: undefined });
  };
  return (
    <div>
             {alertVisible && (
   <Box
      sx={{
         position: 'fixed',
         top: 10,
         right: 20,
         zIndex: 9999,
      }}
   >
      <Alert  icon={alertType === 'success' ?<CheckIcon fontSize="inherit" />:<ErrorIcon fontSize="inherit" />} severity={alertType}>
         {alertType === 'success' ? 'Employee Updated Successfully...' : 'An Error has occurred...'}
      </Alert>
   </Box>
)}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>Add Employee</Box>
            <Button style={{ cursor: 'pointer' }} onClick={onClose}>X</Button>
          </Box>
        </DialogTitle>
        <DialogContent>
            <input onChange={handleFileChange} type='file' accept='image/*' />
          <TextField
            autoFocus
            margin="dense"
            id="employeeId"
            name="employeeId"
            label="Employee ID"
            type="text"
            fullWidth
            value={employeeData.employeeId}
            onChange={handleInputChange}
            error={Boolean(errors.employeeId)}
            helperText={errors.employeeId}
          />
          <TextField
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={employeeData.department.name}
            onChange={handleInputChange}
            error={Boolean(errors?.name)}
            helperText={errors?.name}
          />

          <TextField
            margin="dense"
            id="location"
            name="location"
            label="Location"
            type="text"
            fullWidth
            value={employeeData.location}
            onChange={handleInputChange}
            error={Boolean(errors.location)}
            helperText={errors.location}
          />
          <TextField
            margin="dense"
            id="title"
            name="title"
            label="Job title"
            type="text"
            fullWidth
            value={employeeData.title}
            onChange={handleInputChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
        <TextField
          margin="dense"
          id="jobTitle"
          name="jobTitle"
          label="Department"
          type="text"
          fullWidth
          value={employeeData.department.jobTitle}
          onChange={handleInputChange}
          error={Boolean(errors.jobTitle)}
          helperText={errors.jobTitle}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default PopupDialog;
