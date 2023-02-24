const mongoose=require("mongoose");
const Schema=mongoose.Schema;


const userschema=new Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        minlength:6
    }
})

module.exports=mongoose.model('User',userschema);