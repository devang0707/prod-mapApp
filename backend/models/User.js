const mongoose= require("mongoose");   

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        require: true,
        min:2,
        max:25,
    },
    email:{
        type:String,
        unique: true,
        require: true,
        max:40,
    },
    password:{
        type: String,
        require: true,
        min:4,
        max:25,
    },

},{timestamps:true})

module.exports= mongoose.model("User",UserSchema);  