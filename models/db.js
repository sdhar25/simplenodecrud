const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Employeedb',{ useNewUrlParser: true }, (err)=>{
    if(!err){
        console.log('MOngodb connection succeeded');
    }
    else{
        console.log('Connection error- '+err);
    }
});

require('./employee.model');