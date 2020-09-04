const mongoose = require('mongoose');
UserSchema= new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String

    },
    date:{
        type:Date,
        default:Date.now
    }
});
 module.exports=Users=mongoose.model('users',UserSchema);