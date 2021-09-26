const express = require('express');

var router = express.Router();

const mongoose = require('mongoose');
const Employee = mongoose.model('Employee'); // using schema


router.get('/',(req,res)=>{
    //res.json('sampletext');
    res.render("employee/addOrEdit", {
        viewTitle:"Insert Employee"
    });
});


router.post('/',(req,res)=>{
    //console.log(req.body);
    if(req.body._id == ''){
        insertRecord(req,res);
    }
    else{
        updateRecord(req,res);
    }
    
});

function updateRecord(req,res){
    //sending id, body data, true means new data of form, and callback errand doc
    Employee.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit", {
                    viewTitle:"Update Employee",
                    employee:req.body
                });

            }
            else{
            console.log('error '+err); //problem in saving
            }

        }
    })
}

function insertRecord(req,res)
{
    //create object
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;

    employee.save((err,doc)=>{
        if(!err){
            res.redirect('employee/list');
        }else{
            //our problem
            if(err.name == 'ValidationError'){
                handleValidationError(err,req.body);
                res.render("employee/addOrEdit", {
                    viewTitle:"Insert Employee",
                    employee:req.body
                });

            }
            else{
            console.log('error '+err); //problem in saving
            }
        }
    });

}
function handleValidationError(err,body){
    for(field in err.errors){
        //here path in syntax is fullname, email,monile,city
        switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;

            case 'email':
                  body['emailError'] = err.errors[field].message;
                  break;

            case 'mobile':
                  body['mobileError'] = err.errors[field].message;
                  break;

            case 'city':
                  body['cityError'] = err.errors[field].message;
                  break;



        }
    }
}

//listing
router.get('/list',(req,res)=>{
   // res.json('sampletext');
   Employee.find((err,docs)=>{
        if(!err){
            res.render("employee/list",{
                list:docs
            });

        }
        else{
            console.log("error- "+err);
        }
    }).lean();
    //need to give lean() because showing warnings of express handlebarss
    // res.render("employee/addOrEdit", {
    //     viewTitle:"Insert Employee"
    // });
});

//edit
router.get('/:id',(req,res)=>{
    Employee.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("employee/addOrEdit",{
                viewTitle:"Update Employee",
                employee:doc //sending object
            });
        }
        else{
            console.log('error- '+err);
        }
    }).lean();
});


//delete

router.get('/delete/:id',(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/employee/list');
        }else{
            console.log('error- '+err);
        }
    }).lean();
});

module.exports = router;