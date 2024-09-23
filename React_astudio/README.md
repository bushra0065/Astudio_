Overview
This React application demonstrates a data management system with two main pages: Users and Products. It fetches data from the DummyJSON API and displays it in a tabular format with various features such as pagination, filtering, and search functionality.
Features

Two main pages: Users and Products
Data fetching from DummyJSON API
Pagination
Page size selection (5, 10, 20, 50 items per page)
Client-side search functionality
Filter inputs for specific fields
Responsive design
Shared page size across pages using Context API

Technologies Used

React
React Router
Axios for API requests
Styled Components for styling
Context API for state management

Setup and Installation

Clone the repository
Navigate to the project directory
Install dependencies:
npm install

Start the development server:
npm start

Project Structure

src/

components/: Reusable components (DataTable, Filters, Pagination)
pages/: Main pages (Users, Products)
context/: AppContext for shared state
hooks/: Custom hooks (useFetchData)


API Limitation
Please note that the DummyJSON API does not provide specific endpoints for filtering products by brand or category. The application implements client-side filtering for these fields on the Products page. In a real-world scenario, you would typically have server-side filtering for better performance and accuracy.
Usage

Navigate between Users and Products pages using the navigation menu
Use the dropdown to change the number of items displayed per page
Use the search icon to toggle the search input for filtering data
Enter text in the filter inputs to filter by specific fields
Use the pagination controls to navigate through the data
