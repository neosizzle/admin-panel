const mongoose = require('mongoose')

//task schema
const postSchema = mongoose.Schema({
    title:{
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    picture : {
        type : Buffer
    }


},{timestamps : true})

//attatching task schema to task model
const Post = mongoose.model("Post",postSchema)

module.exports = Post