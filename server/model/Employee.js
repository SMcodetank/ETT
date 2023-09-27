const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    deperment:{
        type:String,
        require:true,
    },
    salary:{
        type:String,
        require:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default:"employee"
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
