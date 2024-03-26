const express = require('express');
const Employee = require('../../model/Employee')
const router = express.Router();

// GET all employees
router.get('/', async (req, res) => {
  try {
    // Retrieve all employees from the database
    const employees = await Employee.find();
    // Send the retrieved employees as a response
    res.json(employees);
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).send('Error retrieving employees');
  }
});

module.exports = router;
