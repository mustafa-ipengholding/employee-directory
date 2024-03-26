const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('./middleware/bosyParser')
const dataRoutes = require('./routes/dataRoutes')
const getEmployee = require('./routes/get/AllEmployee')
const deleteEmployee = require('./routes/delete/deleteEmploye')
const updateEmployee = require('./routes/update/UpdateEmployee')
require('dotenv').config();


const {DB_PORT, DB_HOST, DB_DATABASE, MONGODB_URL } = process.env
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 8000;
const MongoDBURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  console.log('MONGO URL', MongoDBURL);
// Connect to MongoDB
try {
  mongoose.connect(`${MONGODB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB connected')
} catch (err) {
  console.error(err.message);
}
// Use middleware
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser);

app.use(cors())
app.use(express.static('storage'))
// Use Post Employee routes
app.use('/data', dataRoutes);

//getEmployee
app.use('/getdata',getEmployee)

//Delete Employee
app.use('/deleteEmployee',deleteEmployee)

//Update Employee
app.use('/updatedata',updateEmployee)



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
