//user routes file
const auth = require('../middleware/auth')
const express = require('express')
const {userLogin , userLogout , storeUser} = require('../controllers/usersController')

const router = express.Router();



router.post('/login' , userLogin)
router.post('/logout' ,auth, userLogout)
router.post('/', storeUser)

module.exports = router;