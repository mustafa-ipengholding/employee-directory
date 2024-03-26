import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import { useGetEmployeeQuery, useUpdateEmployeeMutation } from '../redux/reducers/apiSlice';
import * as yup from 'yup';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const PopupUpdate = ({ open, onClose, employeeData }) => {
  const defaultEmployeeData = {
    employeeId: '',
    location: '',
    title: '',
    department: { name: '', jobTitle: '' },
    image: null // Add image field to default data
  };

  const [updatedEmployeeData, setUpdatedEmployeeData] = useState(defaultEmployeeData);
  const [errors, setErrors] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');

  const [updateEmployee] = useUpdateEmployeeMutation();
  const { refetch: refetchEmployees } = useGetEmployeeQuery();

  const schema = yup.object().shape({
    employeeId: yup.string().required('Employee ID is required').min(1, 'Employee ID cannot be negative'),
    location: yup.string().required("This field is required"),
    title: yup.string().required("This field is required"),
    department: yup.object().shape({
      name: yup.string().required("This field is required"),
      jobTitle: yup.string().required("This field is required")
    }).required('This Field is required')
  });

  const validateForm = async () => {
    try {
      await schema.validate(updatedEmployeeData, { abortEarly: false });
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
    if (await validateForm()) {
      try {
        const updateddata = {
          employeeId: updatedEmployeeData?.employeeId,
          location: updatedEmployeeData?.location,
          title: updatedEmployeeData?.title,
          image: updatedEmployeeData?.image,
          department: {
            name: updatedEmployeeData?.department?.name,
            jobTitle: updatedEmployeeData?.department?.jobTitle
        }
      }

        const response = await updateEmployee({ id: employeeData._id , updateddata });
        if (response?.data?.status === 200) {
          // If the update was successful, refetch the updated employee data
          // Refetch all employees or use a specific query to fetch the updated employee data
          await refetchEmployees();
          setAlertType('success');
        } else {
          setAlertType('error');
        }
      } catch (error) {
        console.error('Error:', error.message);
        // Handle errors, show error messages, etc.
      } finally {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        onClose();
      }
    }
  };


  useEffect(() => {
    if (employeeData) {
      setUpdatedEmployeeData(employeeData);
    }
  }, [employeeData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDepartmentChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployeeData(prevState => ({
      ...prevState,
      department: {
        ...prevState.department,
        [name]: value
      }
    }));

    // Update the errors state for the department name
    setErrors(prevErrors => ({
      ...prevErrors,
      department: {
        ...prevErrors.department,
        name: undefined // Clear the error for department name
      }
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0]; //selected image
    setUpdatedEmployeeData(prevState => ({
      ...prevState,
      image: file
    }));
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
          <Box>Update Employee</Box>
          <Button style={{ cursor: 'pointer' }} onClick={onClose}>X</Button>
        </Box>
      </DialogTitle>
      <DialogContent>
      <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="employeeId"
          name="employeeId"
          label="Employee ID"
          type="text"
          fullWidth
          value={updatedEmployeeData.employeeId}
          onChange={handleInputChange}
          error={!!errors.employeeId}
          helperText={errors.employeeId}
        />
        <TextField
          margin="dense"
          id="departmentName"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={updatedEmployeeData?.department?.name}
          onChange={handleDepartmentChange}
          error={errors?.department?.name}
          helperText={errors?.department?.name}
          sx={{
            "& fieldset": {
              borderColor: updatedEmployeeData?.department?.name.length > 0 ? "grey" : "red",
            },
          }}
        />
        <TextField
          margin="dense"
          id="location"
          name="location"
          label="Location"
          type="text"
          fullWidth
          value={updatedEmployeeData.location}
          onChange={handleInputChange}
          error={!!errors.location}
          helperText={errors.location}
        />
        <TextField
          margin="dense"
          id="title"
          name="title"
          label="Job title"
          type="text"
          fullWidth
          value={updatedEmployeeData.title}
          onChange={handleInputChange}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField

          margin="dense"
          id="departmentJobTitle"
          name="jobTitle"
          label="Department"
          type="text"
          fullWidth
          value={updatedEmployeeData?.department?.jobTitle}
          onChange={handleDepartmentChange}
          error={!!errors?.department?.jobTitle}
          helperText={errors?.department?.jobTitle}
          sx={{
            "& fieldset": {
              borderColor: updatedEmployeeData?.department?.jobTitle.length > 0 ? "grey" : "red",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default PopupUpdate
