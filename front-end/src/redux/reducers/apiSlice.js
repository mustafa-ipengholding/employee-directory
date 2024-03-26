import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000",prepareHeaders: (headers) => {
    // Add CORS headers to allow requests from the frontend server
    headers.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    return headers;
  },
}),
  endpoints: (builder) => ({
    getEmployee: builder.query({
      query: () => "/getdata", // Assuming "api" is the endpoint to fetch all employees
    }),
    addEmployee: builder.mutation({
      query: (employeeData) => {
        const formData = new FormData();
        // Append employee data
        formData.append('employeeId', employeeData.employeeId);
        formData.append('location', employeeData.location);
        formData.append('title', employeeData.title);
        formData.append('department[name]', employeeData.department.name);
        formData.append('department[jobTitle]', employeeData.department.jobTitle);
        // Append image file
        formData.append('image', employeeData.image);
    
        return {
          url: '/data',
          method: 'POST',
          body: formData,
          // headers: {
          //   // Include appropriate headers for file uploads
          //   'Content-Type': 'multipart/form-data',
          // },
        };
      },
      invalidatesTags: ['Employee'],
    }),
    



     // Add a new employee
    //  addEmployee: builder.mutation({
    //     query: (employee) => ({
    //       url: '/data?',
    //       method: 'POST',
    //       body: employee,
    //       headers: {
    //                 // Include appropriate headers for file uploads
    //                 'Content-Type': 'multipart/form-data',
    //               },
    //     }),
    //     invalidatesTags: ['Employee'],
    //   }),
      // Update an existing employee
      // updateEmployee: builder.mutation({
      //   query: ({ id, ...requestData }) => {
      //     // Extract the inner updateddata object
      //     const updateddata = requestData?.updateddata;
        
      //     // Parse the department property if it's a string
      //     if (typeof updateddata.department === 'string') {
      //       try {
      //         updateddata.department = JSON.parse(updateddata.department);
      //       } catch (error) {
      //         console.error('Error parsing department property:', error);
      //       }
      //     }
      
      //     // Create a FormData object
      //     const formData = new FormData();
      
      //     // Append other fields to the FormData object
      //     Object.entries(updateddata).forEach(([key, value]) => {
      //       if (key === 'image' && value instanceof File) {
      //         formData.append(key, value.name); // Append file
      //       } else if (key === 'department') {
      //         // If the key is 'department' and value is not an array, append it directly
      //         if (Array.isArray(value)) {
      //           value.forEach((departmentValue, index) => {
      //             formData.append(`department[${index}]`, departmentValue);
      //           });
      //         } else {
      //           formData.append('department', value); // Append single value
      //         }
      //       } else {
      //         formData.append(key, value); // Append other fields
      //       }
      //     });
      
      //     return {
      //       url: `/updatedata?id=${id}`,
      //       method: 'PUT',
      //       body: formData,
      //       processData: false,
      //       contentType: false,
      //     };
      //   },
      //   invalidatesTags: ['Employee'],
      // }),
      
      updateEmployee: builder.mutation({
        query: ({ id, ...employee }) => {
          console.log(employee, 'employee');
          const formData = new FormData();
          console.log(formData, 'FormData');
          // Append employee data
          formData.append('id', id); // Assuming id is the correct field name
          console.log(employee.updateddata.location, 'Location'); // Check location value
          formData.append('location', employee?.updateddata?.location);
          console.log(employee.updateddata.title, 'Title'); // Check title value
          formData.append('title', employee?.updateddata?.title);
          
          // Check if department exists before accessing its properties
          if (employee?.updateddata?.department) {
            console.log(employee.updateddata.department.name, 'Department Name'); // Check department name value
            formData.append('department[name]', employee?.updateddata?.department.name);
            console.log(employee.updateddata.department.jobTitle, 'Department Job Title'); // Check department jobTitle value
            formData.append('department[jobTitle]', employee?.updateddata?.department.jobTitle);
          }
          
          // Append image file if needed
          if (employee?.updateddata?.image) {
            console.log(employee.updateddata.image, 'Image'); // Check image value
            formData.append('image', employee?.updateddata?.image);
          }
          
          console.log(formData, 'FormData with Appended Data'); // Check formData after appending data
          
          return {
            url: `/updatedata?id=${id}`, // Assuming the same endpoint for both POST and PUT requests
            method: 'PUT', // Change method to POST
            body: formData,
            // headers: {
            //   // Include appropriate headers for file uploads
            //   'Content-Type': 'multipart/form-data',
            // },
          };
        },
        invalidatesTags: ['Employee'],
      }),
      
      
      
      
      
           
      // updateEmployee: builder.mutation({
      //   query: ({ id, ...employee }) => ({
      //     url: `/updatedata?id=${id}`,
      //     method: 'PUT',
      //     body: employee,
      //   }),
      //   invalidatesTags: ['Employee'],
      // }),      
      // Delete an employee
      deleteEmployee: builder.mutation({
        query: (id) => ({
          url: `/deleteEmployee?id=${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Employee'],
      }),
  }),
});

export const { 
    useGetEmployeeQuery,
    useAddEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
 }
     = employeeApi;

export default employeeApi.reducer;
