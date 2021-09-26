require('./models/db');

const express = require('express');
const path = require('path');

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const employeeController = require('./controllers/employeeController');

var app = express();



app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname: 'hbs', defaultLayout: 'mainLayout',layoutDir: __dirname+ '/views/layouts/'}));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));




app.listen(3000,()=>{
    console.log('listening');
});


app.use('/employee',employeeController);
