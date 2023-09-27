const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

//model
const User = require('./model/User')
const Employee = require('./model/Employee')

const app = express();
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

//database connections

dbURL = 'mongodb://127.0.0.1:27017/ETT'
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(3020, () => {
      console.log("server running on http://localhost:3020")
    })
  }).catch((err) => console.log(err));



//all api's


//register
app.post('/register', (req, res) => {
  const { name,
    department,
    salary,
    email,
    password, } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      User.create({ name, department, salary, email, password: hash, })
        .then(user => res.json({ status: "ok" }))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})


//login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // First, check if the email exists as a user
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        // If the email belongs to a user, compare the password
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role },
              "jwt-secret-key", { expiresIn: '1d' });

            res.cookie('token', token);
            return res.json({ Status: "success", role: user.role });
          } else {
            return res.json("Password is incorrect");
          }
        });
      } else {
        // If the email is not found as a user, check if it's an employee
        // Replace 'Employee' with the actual model name for employees
        Employee.findOne({ email: email })
          .then((employee) => {
            if (employee) {
              // If the email belongs to an employee, compare the password
              bcrypt.compare(password, employee.password, (err, response) => {
                if (response) {
                  const token = jwt.sign({ email: employee.email, role: 'employee' },
                    "jwt-secret-key", { expiresIn: '1d' });

                  res.cookie('token', token);
                  return res.json({ Status: "success", role: 'employee' });
                } else {
                  return res.json("Password is incorrect");
                }
              });
            } else {
              // If the email is not found as an employee either, return 'user not found'
              return res.json("User not found");
            }
          })
          .catch((err) => {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
          });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    });
});








// Add this route to your backend
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ status: 'ok' });
});





///CRUD
app.post('/employees', (req, res) => {
  // Extract employee data from req.body, including email and password
  const { name, deperment, salary, email, password } = req.body;

  // Hash the password using bcrypt before saving it to the database
  bcrypt.hash(password, 10, (hashError, hashedPassword) => {
    if (hashError) {
      return res.status(500).json({ error: 'Password hashing error' });
    }

    // Create a new employee record with hashed password
    const newEmployee = new Employee({
      name,
      deperment,
      salary,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the new employee to the database
    newEmployee
      .save()
      .then((employee) => {
        res.json(employee); // Respond with the created employee data
      })
      .catch((error) => {
        res.status(500).json({ error: 'Unable to create employee' });
      });
  });
});




app.get('/employees', (req, res) => {
  // Fetch all employees from the database
  Employee.find()
    .then((employees) => {
      res.json(employees); // Respond with the list of employees
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to fetch employees' });
    });
});


app.get('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  // Fetch employee by ID from the database
  Employee.findById(employeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee); // Respond with the employee data
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to fetch employee' });
    });
});



app.put('/employees/:id', (req, res) => {
  const employeeId = req.params.id;
  const { name, deperment, salary } = req.body;

  // Update employee by ID in the database
  Employee.findByIdAndUpdate(employeeId, { name, deperment, salary }, { new: true })
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee); // Respond with the updated employee data
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to update employee' });
    });
});



app.delete('/employees/:id', (req, res) => {
  const employeeId = req.params.id;

  // Delete employee by ID from the database
  Employee.findByIdAndRemove(employeeId)
    .then((employee) => {
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Unable to delete employee' });
    });
});
