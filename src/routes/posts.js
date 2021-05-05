//post routes file
const express = require('express');
const multer = require('multer');
const {showPosts ,showPost,storePosts, updatePosts, destroyPosts } = require('../controllers/postsController')

const router = express.Router();

//multer configuration
const upload = multer({
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){//checks if the postfix of the filename is an image file
           return cb(new Error("Please upload an image file!"))
        }

        return cb(undefined,true)
    }
})


router.get('/' , showPosts)
router.get('/:id' , showPost)

router.post('/',upload.single('postImage'),storePosts)
router.post('/:id',upload.single('postImage'),updatePosts)

router.delete('/:id' , destroyPosts)

module.exports = router;