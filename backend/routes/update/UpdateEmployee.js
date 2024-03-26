const express = require('express');
const router = express.Router();
const Employee = require('../../model/Employee');
const fileUpload = require('../../multer/fileUpload')
const fs = require('fs')
require('dotenv').config();


// environment handle
const URL = process.env.LOCALHOST_URL
const PORT = process.env.PORT

// PUT request to update an existing employee
router.put('/', fileUpload.single('image'), async (req, res) => {
  try {
    const { id } = req.query; // Access id from the query parameters
    const { location, title, department } = req.body;
    // Find the employee by ID or any other unique identifier
    const filter = { _id: id }; // Assuming id is the MongoDB ObjectId

    let imageUrl = '';

    // Check if a new image file was uploaded
    if (req.file) {
      imageUrl = `${URL}:${PORT}/${req.file.filename}`; // Assuming you have configured file upload path and port
    }
    // Set the new data to update
    const update = {
      location,
      title,
      department,
      ...(imageUrl && { image: imageUrl }), // Include image only if a new image was uploaded
    };

    // Update the employee
    const updatedEmployee = await Employee.findOneAndUpdate(filter, update, {
      new: true, // Return the modified document rather than the original
      runValidators: true, // Run validators (e.g., required, enum) on the update operation
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ status: 200, message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Error updating employee');
  }
});





// router.put('/', async (req, res) => {
//   try {
//     const { id } = req.query; // Access id from the query parameters
//     const { location, title, department } = req.body;

//     // Find the employee by ID or any other unique identifier
//     const filter = { _id: id }; // Assuming id is the MongoDB ObjectId

//     // Set the new data to update
//     const update = { location, title,image, department };

//     // Update the employee
//     const updatedEmployee = await Employee.findOneAndUpdate(filter, update, {
//       new: true, // Return the modified document rather than the original
//       runValidators: true, // Run validators (e.g., required, enum) on the update operation
//     });

//     if (!updatedEmployee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     res.json({ status: 200, message: 'Employee updated successfully', updatedEmployee });
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).send('Error updating employee');
//   }
// });

module.exports = router;
