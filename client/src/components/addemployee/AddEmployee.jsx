import React, { useState } from 'react';
import './addemployee.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Import useAuth

export const AddEmployee = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if the user is an admin to render the form
  
    const handleSubmit = (e) => {
      e.preventDefault();

      // Create an object with employee data
      const newEmployee = {
        name,
        department,
        salary,
        email,
        password,
      };

      // Send a POST request to your backend to create the employee
      axios
        .post('http://localhost:3020/employees', newEmployee)
        .then((res) => {
          // Redirect to the AdminDashboard on successful creation
          navigate('/admindashboard');
        })
        .catch((err) => console.log(err));
    };

    const labelStyle = {
      marginTop: '25px',
    };

    return (
      <>
        <div className="third-form">
          <div className="des">
            <form onSubmit={handleSubmit}>
              <div className="mb-3 mt-3" style={labelStyle}>
                <label htmlFor="name" className="form-label">
                  Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 mt-3" style={labelStyle}>
                <label htmlFor="department" className="form-label">
                  Department:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="department"
                  placeholder="Enter department"
                  name="department"
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 mt-3" style={labelStyle}>
                <label htmlFor="salary" className="form-label">
                  Salary:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="salary"
                  placeholder="Enter salary"
                  name="salary"
                  onChange={(e) => setSalary(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 mt-3" style={labelStyle}>
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3" style={labelStyle}>
                <label htmlFor="pwd" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="pwd"
                  placeholder="Enter password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={labelStyle}>
                Create Employee
              </button>
            </form>
          </div>
        </div>
      </>
    );
  
};
