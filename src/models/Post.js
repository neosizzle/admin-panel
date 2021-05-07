const mongoose = require('mongoose')

//post schema
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

//attatching post schema to post model
const Post = mongoose.model("Post",postSchema)

module.exports = Post