const User = require('../models/User')

//user login endpoint
const userLogin = async (req,res)=>{


    //get email and pw from body
    const username = req.body.username
    const password = req.body.password

    //send error if there is no email or pw
    if(!username || !password) return res.status(404).send({error : "Bad request!"})

    try{
        //try to find credentials using usermodel static method
        const user = await User.findByCredentials(username,password)
        if(!user) return res.status(404).send({error : "Unable to login!"})

        
        const token = await user.generateAuthToken()
        res.send({user,token})



    }
    catch(e){
        
        res.status(401).send({error : e.message})
    }
}

//user logout endpoint  
const userLogout = async (req, res) => {
    try{

        //filter out the current user token and save the user
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        })

        await req.user.save()

        res.status(200).send()
    }catch(e){res.status(500).send({e})}
}

//add new users endpoint
const storeUser =  async (req,res)=>{
    
    const user = new User(
        req.body
    )
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(error){
        res.status(400).send('Save Error!' + error)
    }

}

module.exports = {
    userLogin,
    userLogout,
    storeUser
}