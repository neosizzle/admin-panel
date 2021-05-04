const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//user schemea
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true

    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate(value){
            if(value.length < 6) throw new Error('Password must be logner than 6 characters!')
            if(value.toLowerCase() == 'password')throw new Error('Not literally!')
        }


    },

    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},{timestamps : true}
)


//set schema methods
//hashes passowrd
userSchema.pre('save', async function(next){//normal function used because .pre() is a methid that needs the this bind
    const user = this
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password,8)
    next()
})


//find by credentials
userSchema.statics.findByCredentials = async(username,password)=>{

    //create your own methods accesible on models
    const user = await User.findOne({username})
    if(!user) throw new Error('User dosnt exist!')


    //compares password and throws error if does not match
    if(!await bcrypt.compare(password,user.password)) throw new Error("Unable to login!")

    return user

}


//generate token
userSchema.methods.generateAuthToken = async function(){//creating your own methods accesible on instances
    const user = this

    //create new token
    const token = jwt.sign({_id : user.id.toString() },process.env.JWT_SECRET, {expiresIn: '2h'})
    user.tokens = user.tokens.concat({token})
    await user.save()

    return token
}


//get user profile data w/o passwords and tokens
userSchema.methods.toJSON = function(){
    const user = this

    userData = user.toObject()//returns a bland js object without mongoose methods/metadata
   
    delete userData.password
    delete userData.tokens

    return userData
    
}


//attatching user schema to user model
const User = mongoose.model("User",userSchema)

module.exports = User