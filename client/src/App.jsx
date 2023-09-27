
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/home/Home';
import { About } from './components/about/About';
import { Story } from './components/story/Story';
import { Login } from './components/login/Login';
import { AdminDashboard } from "./components/adminDashboard/AdminDashboard";
import { EmployeDashboard } from "./components/employeDashboard/EmployeDashboard";
import { Signup } from './components/register/Signup';
import { AuthProvider } from './components/AuthContext';
import { AddEmployee } from './components/addemployee/AddEmployee';

function App() {
  return (
    <>
      <AuthProvider >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/story' element={<Story />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
            <Route path='/addemployee' element={<AddEmployee />} />
            <Route path='/admindashboard' element={<AdminDashboard />} />
            <Route path='/employeedashboard' element={<EmployeDashboard />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </>
  )
}

export default App
