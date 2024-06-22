const mongoose =require("mongoose")
const Schema =mongoose.Schema;

const userSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    jobrole:{
        type:String,
        required:true
    }
});

const Employe= mongoose.model('employe',userSchema);
module.exports =Employe;