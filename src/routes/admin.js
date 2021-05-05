//admin routes file
const auth = require('../middleware/auth')
const express = require('express')
const {showLogin,showDashboard, showPosts , createPosts , editPosts} = require('../controllers/adminController')

const router = express.Router();


router.get('/' , showLogin)

router.get('/dashboard' , showDashboard)
router.get('/dashboard/posts', showPosts)
router.get('/dashboard/posts/create' , createPosts)
router.get('/dashboard/posts/edit' , editPosts)

router.get('/dashboardAuth' , auth, (req, res)=>{res.status(200).send({status : "Authorized" , user : req.user})})


module.exports = router;