//import required dependencies
const express = require('express');
const app = express();
require('dotenv').config();
require('./db/mongoose')//run db init
const bodyParser = require('body-parser')
const path = require('path');


app.set('port', process.env.port || 3000) 


app.set('port', process.env.PORT) 


app.use(bodyParser.json({limit : '30mb' , extended : 'true'}))//bodyparser for parsing json reqs and responses. good lib
app.use(bodyParser.urlencoded({limit : '30mb' , extended : 'true'}))//bodyparser for parsing json reqs and responses. good lib

//declares express public directory path and tells the app to use that path to serve up static assets such as html
const publicDirPath = path.join(__dirname, '../public')
app.use(express.static(publicDirPath))

//get routes
const adminRoutes = require("./routes/admin")
const postsRoutes = require("./routes/posts")

app.use('/admin' , adminRoutes)
app.use('/posts' , postsRoutes)

app.get('/', (req, res, next) =>{
    res.send('<h1>Hello world<h1>');
})

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})