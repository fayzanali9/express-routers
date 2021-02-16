const express = require('express');
const app = express();

const path = require('path')

const bodyParser = require('body-parser');
// To parse URL encoded data
app.use(bodyParser.urlencoded({ extended: false }));
// To parse json data
app.use(bodyParser.json());

// log requests
const morgan = require('morgan')
app.use(morgan('tiny'));

// Template engines are libraries that allow us to use
// different template languages. 
// A template language is a special set of instructions 
// (syntax and control structures) 
// that instructs the engine how to process data. 
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// call an instance of the express.Router(), apply routes to it, 
// and then tell our application to use those routes.
const router = express.Router();


router.use(function(req, res, next) {

    // log each request to the console
    console.log(`request method is ${req.method} and request url is ${req.url}`);

    // continue doing what we were doing and go to the route
    next(); 
});

// Express's .param() middleware.
// This creates middleware that will run for a certain route parameter. 
// In our case, we are using :name in our yo route. 
// Here's the param middleware.

// route middleware to validate :name
router.param('name', function(req, res, next, name) {
    // do validation on name here
    // some validation
    // log something so we know its working
    console.log('doing name validations on ' + name);

    // once validation is done save the new item in the req
    req.name = name;
    // go to the next thing
    next(); 
});

// validate this name somehow.look above code

router.get('/yo/:name', function(req, res) {
    res.send('yo ' + req.params.name + '!');
});

router.get('/newhome',(req, res) =>{
    res.send('This is our new home');  
});

// Above code can be written as below code
// app.route('/newhome').get((req, res) =>{
//     res.send('This is our new home');  
// });

app.use('/', router);

// In the below code instead of calling express.Router(), 
// we can call app.route and start applying our routes there.
app.route('/login')

    // show the form (GET http://localhost:3000/login)
    .get(function(req, res) {
        res.send('this is the login form');
    })

    // process the form (POST http://localhost:3000/login)
    .post(function(req, res) {
        console.log('processing');
        res.send('processing the login form!');
    });


app.use('/home', (req, res, next) => {
	console.log('A new request received at ' + Date.now());
	next();
	// if we define the route app.get('/home')
	// before the middleware app.use('/home'), 
	// the middleware function will not be invoked.

	// output
	// A new request received at 1613496999141
	// A new request received at 1613497001988
  });

app.get('/',(req,res) =>{
	res.send("welcome to express framework 0")
});



app.get("/mail", function (request, response){
	response.sendFile(__dirname+"/views/index.html");
});

app.get("/getemail", function (request, response){
	let firstname = request.query.firstname12;

	if (firstname != "") {
		response.send("Your email address is " + firstname + "@outlook.com");
	} else {
		response.send("Please provide us first name");
	}
});


app.get('/home',(req,res) => {res.send("This is home page")});
app.get('/about',(req,res) => {
	res.send("About us page")
});

app.get('/hey',(req,res) =>{
	res.render('index');
})

app.get('*',(req,res) =>{
	res.send("404 error invalid Url")
});

// below code doesn't work

// app.get('/hey',(req,res) =>{
// 	res.render('index');
// })


app.listen(3000,() => console.log("running as usual on 3000"));