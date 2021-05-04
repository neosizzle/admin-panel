//db init file
const chalk = require('chalk');
const mongoose = require('mongoose')

//connect to db with db url
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
})
.then((data)=>{
    console.log(chalk.green("Connection to mongodb successful"))
})
.catch((e)=>{
    console.log(e.message)
    console.log(chalk.red("Connection to mongodb failure"))
})