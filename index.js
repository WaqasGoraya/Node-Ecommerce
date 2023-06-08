import env from  'dotenv';
env.config();
import express from 'express';
import  path  from 'path';
import web from './routes/web.js';
import CONNECT_DB from './config/dbConfig.js';
import flash from 'express-flash';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passportLocal from './config/passportConfig.js';
const app = express();
const port = process.env.port || 3300;
const dburl = process.env.DB_URL;

//Mongo DB session storage
const mongostore = new MongoStore({
    mongoUrl:process.env.DB_URL,
    dbName:process.env.DB_NAME
});

//session
app.use(session({
    name:'ecommerce-session',
    secret: process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave:false,
    store:mongostore,
    cookie:{maxAge: 1000 * 60 * 60 * 24 }
}));
//flash
app.use(flash());
passportLocal(passport); 
app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

app.use(express.static(path.join(process.cwd(),'public')));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));

//DB connection
CONNECT_DB(dburl);

//Routes
app.use('/',web);



app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
});
