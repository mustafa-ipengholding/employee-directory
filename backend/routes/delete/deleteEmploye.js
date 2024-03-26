const express = require('express');
const router = express.Router();
const Employee = require('../../model/Employee');

// DELETE an employee by ID
router.delete('/', async (req, res) => {
  try {
    const { id } = req.query; // Access id from the query parameters

    // Find the employee by ID and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ status: 200 ,message: 'Employee deleted successfully', deletedEmployee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send('Error deleting employee');
  }
});

module.exports = router;
