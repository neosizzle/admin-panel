//post routes file

const express = require('express')
const {showPosts} = require('../controllers/postsController')

const router = express.Router();


router.get('/' , showPosts)

module.exports = router;