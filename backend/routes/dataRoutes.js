const express = require('express');
const Employee = require('../model/Employee');
const router = express.Router();
const fileUpload = require('../multer/fileUpload');
require('dotenv').config();

const URL = process.env.LOCALHOST_URL
const PORT = process.env.PORT

router.post('/', fileUpload.single('image'), async (req, res) => {
  try {

    const { employeeId, location, title, department } = req.body;
        let image = ''
    // Check if file was uploaded
    if (req.file) {
      image = `/${req.file.filename}`
    

    }else{
      return res.status(400).json({ error: 'No file uploaded' });

    }
    const imageUrl = `${URL}:${PORT}/${image}`;
    // Create a new instance of the Employee model with image reference
    const newEmployee = new Employee({
      employeeId: employeeId,
      location: location,
      title: title,
      department: department,
      image: imageUrl, // Store reference to the image
    });

    // Save the new employee data to the database
    const savedEmployee = await newEmployee.save();

    // Send the saved employee data in the response
    res.json({status : 200, savedEmployee});
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error saving data');
  }
});


module.exports = router;
