//admin routes file

const express = require('express')
const {showDashboard} = require('../controllers/adminController')

const router = express.Router();


router.get('/' , showDashboard)

module.exports = router;