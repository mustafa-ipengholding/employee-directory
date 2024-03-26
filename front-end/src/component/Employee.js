import React, { useState } from 'react';
import {
  useGetEmployeeQuery,
  useDeleteEmployeeMutation,
} from '../redux/reducers/apiSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container, Box, Pagination, TextField } from '@mui/material';
import PopupDialog from './PopupDialog';
import PopupUpdate from './PopupUpdate';
import { MdEdit,MdDeleteForever } from "react-icons/md";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import SkeletonTable from '../loader/SkeltonTable';

const Employee = () => {
  const { data, error, isLoading, refetch } = useGetEmployeeQuery();
  const [openPopup, setOpenPopup] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [updatePopup, setUpdatePopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [page, setPage] = useState(1);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [searchQuery, setSearchQuery] = useState('');
  const employeesPerPage = 8;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await deleteEmployee(id)
      if (response?.data?.status === 200) {
        setAlertType('success');
      } else {
        setAlertType('error');
      }
    } catch (error) {
    } finally {
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
      refetch();
    }
  };

  const handleOpenPopup = (employee) => {
    setOpenPopup(true);
    setSelectedEmployee(employee);
  };

  const handleupdateClosePopup = () => {
    setUpdatePopup(false);
  };

  const handleupdateOpenPopup = (employee) => {
    setUpdatePopup(true);
    setSelectedEmployee(employee);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const startIndex = (page - 1) * employeesPerPage;
  const endIndex = startIndex + employeesPerPage;

  const filteredEmployees = data?.filter((employee) =>
    employee?.department?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div><SkeletonTable/></div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) {
    return null;
  }
console.log(filteredEmployees,'filteres');
  return (
    <div style={{marginBottom:"20px"}}>
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
            {alertType === 'success' ? 'Task Completed Successfully...' : 'An Error has occurred...'}
          </Alert>
        </Box>
      )}

      <Container>
        <Box sx={{display:"flex",marginTop:'20px',marginBottom:'20px',gap:'5px'}}>
        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          
          />
          <Button sx={{width:'200px'}} onClick={handleOpenPopup} variant="contained" color="primary">Add Employee</Button>
          </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight:"bold"}}>Profile</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Name</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Job Title</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Department</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Location</TableCell>
                <TableCell sx={{fontWeight:"bold"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.slice(startIndex, endIndex).map((val) => (
                
                <TableRow key={val._id}>
                  <TableCell> {val.image && <img style={{ borderRadius: '50%', width: '50px', height: '50px' }}src={val.image} alt="Employee" />}</TableCell>
                  <TableCell> {val.department.name}</TableCell>
                  <TableCell>{val.department.jobTitle}</TableCell>
                  <TableCell>{val.title}</TableCell>
                  <TableCell>{val.location}</TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      <Button sx={{fontSize:"20px"}} onClick={() => handleupdateOpenPopup(val)} variant="outlined" color="primary"><MdEdit /></Button>
                      <Button sx={{fontSize:"20px"}}  onClick={() => handleDeleteEmployee(val._id)} variant="outlined" color="error"><MdDeleteForever /></Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination
            count={Math.ceil((filteredEmployees.length || 0) / employeesPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      </Container>
      {openPopup &&
        <PopupDialog
          open={openPopup}
          onClose={handleClosePopup}
        />
      }
      <PopupUpdate
        open={updatePopup}
        onClose={handleupdateClosePopup}
        employeeData={selectedEmployee}
      />
    </div>
  );
};

export default Employee;
