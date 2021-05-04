const path = require('path')
const publicDirPath =  path.join(__dirname , '../../public')

const showLogin = (req, res)=>{
    res.status(200).sendFile('/admin/login.html' , {root : publicDirPath})
}


const showDashboard = (req, res)=>{
    res.status(200).sendFile('/admin/dashboard.html' , {root : publicDirPath})
}


module.exports = {
    showLogin,
    showDashboard
} 