const path = require('path')
const publicDirPath =  path.join(__dirname , '../../public')

const showDashboard = (req, res)=>{
    res.status(200).sendFile('/admin/dashboard.html' , {root : publicDirPath})
}


module.exports = {
    showDashboard
} 