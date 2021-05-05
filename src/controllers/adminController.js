const path = require('path')
const publicDirPath =  path.join(__dirname , '../../public')

const showLogin = (req, res)=>{
    res.status(200).sendFile('/admin/login.html' , {root : publicDirPath})
}


const showDashboard = (req, res)=>{
    res.status(200).sendFile('/admin/dashboard.html' , {root : publicDirPath})
}

const showPosts = (req,res)=>{
    res.status(200).sendFile('/admin/dashboard-posts.html' , {root : publicDirPath})
}

const createPosts = (req,res)=>{
    res.status(200).sendFile('/admin/dashboard-posts-create.html' , {root : publicDirPath})
}

const editPosts = (req,res)=>{
    res.status(200).sendFile('/admin/dashboard-posts-edit.html' , {root : publicDirPath})

}


module.exports = {
    showLogin,
    showDashboard,
    showPosts,
    createPosts,
    editPosts
} 