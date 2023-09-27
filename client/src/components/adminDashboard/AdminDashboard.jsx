import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './admindashboard.css'
import axios from 'axios';
import { AdminNavbar } from '../adminnavbar/AdminNavbar';

export const AdminDashboard = () => {


  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch the list of employees when the component mounts
    axios
      .get('http://localhost:3020/employees')
      .then((response) => {
        setEmployees(response.data); // Update the employees state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching employees', error);
      });
  }, []);

  // Function to handle employee deletion
  const handleDeleteEmployee = async (employeeId) => {
    try {
      // Make an HTTP DELETE request to delete the employee
      await axios.delete(`http://localhost:3020/employees/${employeeId}`);
      // Remove the deleted employee from the state
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== employeeId)
      );
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  }
  return (
    <>
      <AdminNavbar />
      <div className="main1">
        <h1>AdminDashboard</h1>

        <div className="employe-list">
          <div className="indicate">List of Employee</div>
          <div className="add"><Link to={"/addemployee"}>Add Employee</Link></div>

        </div>
        <div className="employe-card">
          {employees.map((employee) => (
            <div className="card" key={employee._id}>
              <div className="info">
                <h2>Name : {employee.name}</h2>
                <h2>Department : {employee.deperment}</h2>
                <h2>Salary : {employee.salary}</h2>
              </div>
              <div className="more">
                <Link to={`/user/${employee._id}`}>Read more</Link>
                <button
                  onClick={() => handleDeleteEmployee(employee._id)}
                  className="delete-button"
                >Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
