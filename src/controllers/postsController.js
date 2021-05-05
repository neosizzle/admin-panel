const Post = require('../models/Post')
const multer = require('multer')

//find and return all posts
const showPosts = async (req, res)=>{

    try {
        const posts = await Post.find({})
        res.status(200).json(posts)
    } catch (error) {
        console.log(`[ERROR] ${error.message}`)
        res.status(500).send({error : error.message})
    }

    
}

//find and return a single post
const showPost = async (req, res)=>{

    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        console.log(`[ERROR] ${error.message}`)
        res.status(500).send({error : error.message})
    }

    
}


//create return a single post
const storePosts = async (req,res)=>{
    const newPost = new Post(req.body)
    newPost.picture = req.file.buffer //accessible by multer middleware 

    try {
        await newPost.save()
        //res.status(201).send(newPost)
        //redirect back to page
        res.status(201).redirect('/admin/dashboard/posts')
    } catch (error) {
        console.log(`[ERROR] ${error.message}`)
        res.status(500).send({error : error.message})
    }
}


//find ,upadate and  return a single post
const updatePosts = async (req,res)=>{

    const newPost = new Post(req.body)

    //update picture if input is received
    if(req.file){
        newPost.picture = req.file.buffer //accessible by multer middleware 
    }
    

    try {
        await Post.findByIdAndUpdate(req.params.id , newPost)
        const post = await Post.findById(req.params.id)
        res.status(201).send(post)
    } catch (error) {
        console.log(`[ERROR] ${error.message}`)
        res.status(500).send({error : error.message})
    }
}

//deleta and return a single post
const destroyPosts = async (req,res)=>{

    try {
        const post = await Post.findByIdAndDelete(req.params.id , req.body)
        res.status(201).send(post)
    } catch (error) {
        console.log(`[ERROR] ${error.message}`)
        res.status(500).send({error : error.message})
    }
}

module.exports = {
    showPosts,
    showPost,
    storePosts,
    updatePosts,
    destroyPosts,
}