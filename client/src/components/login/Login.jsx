import React, { useState } from 'react';
import './login.css'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from '../navbar/Navbar';


export const Login = () => {
    const labelStyle = {
        marginTop: "25px"
    }

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3020/login', { email, password })
            .then(res => {
                if (res.data.Status === "success") {
                    if (res.data.role === 'admin') {
                        navigate('/admindashboard');
                    } else if (res.data.role === 'employee') {
                        navigate('/employeedashboard');
                    } else {
                        navigate('/');
                    }
                }
            }).catch(err => console.log(err))
    }



    return (
        <>
        <Navbar />
            <div className="first-from">
                <div className="content">
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3 mt-3" >
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
                                name="pswd"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={labelStyle}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
