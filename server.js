require('dotenv').config();
const express = require('express');
const app = express();                                          //create an instance of express
const ejs = require('ejs');                                     //import ejs module to render the html pages
const path=require('path');                                    //import path module to get the path of the file
const expressLayout = require('express-ejs-layouts');          //import express-ejs-layouts module to use the layout in the ejs file
const PORT = process.env.PORT || 3000;                     
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo')(session);    //import connect-mongo module to store the session in the mongodb database
const passport = require('passport');




// Connect to MongoDB
const url='mongodb://127.0.0.1:27017/pizza';                   //create a url to connect to the database
mongoose.connect(url,err => {
        if(err) throw err;
        console.log('connected to MongoDB...');
    });

    //session store
    let mongoStore=new MongoDbStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    });

    //session configuration
    app.use(session({                  //use the session middleware to create a session for the user and store the user data in the session object in the req object (req.session) and the session object is available in the ejs file as req.session (req.session.user)
        secret: 'process.env.COOKIE_SECRET',         //secret is a string that is used to encrypt the session cookie
        resave: false,                               //resave is a boolean that tells mongoose to save the session even if it was not modified
        store: mongoStore,
        saveUninitialized: false,                   //saveUninitialized is a boolean that tells mongoose to save the session even if it was not modified
        cookie: {maxAge:1000*60*60*24}  //24 hours                                    //cookie is an object that contains the configuration of the session cookie}
    }));
    app.use(flash());

     //passport configuration
     const passportInit = require('./app/config/passport');
     passportInit(passport);
     app.use(passport.initialize());
     app.use(passport.session());


// Assets
app.use(express.static('public'));                             //use the public folder to store the css and js files that are used in the frontend 
app.use(express.urlencoded({extended:false}));                 //use the extended:true to parse the data in the form
app.use(express.json());                                      //use the json middleware to parse the json data in the request body

//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session;
    res.locals.user = req.user;
    next();
})

//set Template engine
app.use(expressLayout)                                         //use the express-ejs-layouts module to use the layout in the ejs file
app.set('views',path.join(__dirname,'/resources/views'));      //set the path of the views folder
app.set('view engine','ejs');

require('./routes/web')(app);                                  //import the routes/web.js file and pass the app as an argument to the function and use the returned object to set the routes

app.listen(PORT, () => {                                      //listen to the port
    console.log(`Server is running on port ${PORT}`);    
});
