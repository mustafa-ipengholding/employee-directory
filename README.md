# Employee-directory
### Introduction

This documentation provides an overview of the React application developed using React version 18.2.0. The application utilizes Redux Toolkit with RTK Query for managing API responses. It includes functionalities for performing CRUD operations (POST, GET, PUT, DELETE) through RTK Query. Additionally, the application features two modal components: one for updating employee data and another for adding employee data. The landing page displays a table of employees with pagination using Material-UI Table. Users can also search for employees by name using a search bar. Yup validation is implemented for form inputs, including image uploads. A loading skeleton is utilized for improved user experience during data fetching operations.

# Please User 20.11.1 Node Version for this project

## Technologies Used

- ReactJs
- Redux Toolkit
- RTK Query
- Material UI
- Yup
- Loading Skelton

## CRUD Operations

- POST: Add new employee data.
- GET: Retrieve employee data.
- PUT: Update existing employee data.
- DELETE: Remove employee data.

## Modals
#### Update Employee Data Modal: Allows users to update employee information.

#### Add Employee Data Modal: Facilitates adding new employee data.

## Landing Page:
Displays a table of employees with pagination.
Provides a button for adding new employees.
Includes a search bar for filtering employees by name.

## Yup Validation:
Validates form inputs, including image uploads, using Yup.

## Loading Skeleton:

Displays a loading skeleton during data fetching operations to enhance user experience.
## Usage

Clone the project

```bash
  git clone git@bitbucket.org:employeedemoip/employee-task.git
```

Go to the project directory

```bash
  cd employee-task/employee
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## CRUD APP Backend
### Introduction
This documentation provides an overview of the backend application developed using Node.js, Express.js, and MongoDB. The application includes features for handling CRUD operations, file uploads using Multer, CORS for cross-origin resource sharing, and automatic server restarts with Nodemon.

### Technologies Used
-   Node.js
-   Express.js (version 4.18.3)
-   MongoDB
-   Multer
-   CORS
