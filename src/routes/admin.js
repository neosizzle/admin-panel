//admin routes file
const auth = require('../middleware/auth')
const express = require('express')
const {showLogin,showDashboard} = require('../controllers/adminController')

const router = express.Router();

router.get('/' , showLogin)
router.get('/dashboard' , showDashboard)
router.get('/dashboardAuth' , auth, (req, res)=>{res.status(200).send({status : "Authorized" , user : req.user})})

module.exports = router;