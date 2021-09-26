const mongoose = require('mongoose');
//create object for employee schema
var employeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:'This Field is required'
    },
    email:{
        type:String,
        required:'This Field is required'
    },
    mobile:{
        type:String,
        required:'This Field is required'
    },
    city:{
        type:String,
        required:'This Field is required'
    }
});
//custom validation
//we need to use reg expression since no internet so writing syntax only
// employeeSchema.path('email').validate((val)=>{
//     emailRegexp = //;
//     return emailRegexp.test(val);
// },'Invalid email');
//register mongoose.model('singular of collection name',the schema)
mongoose.model('Employee',employeeSchema);