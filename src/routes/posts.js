//post routes file

const express = require('express')
const {showPosts ,showPost,storePosts, updatePosts, destroyPosts } = require('../controllers/postsController')

const router = express.Router();


router.get('/' , showPosts)
router.get('/:id' , showPost)

router.post('/', storePosts)
router.post('/:id',updatePosts)

router.delete('/:id' , destroyPosts)

module.exports = router;