const mongoose = require('mongoose');

// Define nested department schema
const departmentSchema = new mongoose.Schema({
  name: String,
  jobTitle: String,
});

// Define main schema
const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  location: String,
  title: String,
  image: String,
  department: departmentSchema, // Nested schema
},
{
  collection: 'employee' // Specify the collection name explicitly
}
);

// Create model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
