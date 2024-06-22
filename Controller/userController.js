const Employe= require("../Schema/UserModel")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
require("dotenv").config();


//UserSignUp...

const UserSignUp = async (req, res) => {
    const { name, email, password, jobrole} = req.body;
    const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

    try {
        if (!email) {
            return res.status(400).send({ msg: "Email is required" });
        } else if (!emailRegex.test(email)) {
            return res.status(400).send({ msg: "Invalid email format" });
        }
        const userEmail = await Employe.findOne({ email });
     
        if (userEmail) {
            return res.status(409).send({ msg: "Email is already registered" });
        }

        if (!password) {
            return res.status(400).send({ msg: "Password is required" });
        }
        
        const salt=10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const data = {
            name,
            email,
            password: hashedPassword,
            jobrole,    
        };
        
        const user = await Employe.create(data);
        console.log(user,"This is user :")
        res.status(201).send({ msg: "Success", data: user });

    } 
    catch (error) {
        console.error(error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
};

//get all user

const Alluser =async(req,res)=>{
    const allemploye = await Employe.find();
    res.status(200).send({msg:"All users",data:allemploye})
}


//Login..

const UserLogin = async (req,res)=>{
    const {email,password} = req.body
    const registerUser = await Employe.findOne({email})
    const id = registerUser._id
    console.log(registerUser)
    const token = jwt.sign({_id:id,password:registerUser.password},process.env.SECRET_KEY)
 
    const userPassword =await  bcrypt.compare(password,registerUser.password)
    console.log(userPassword);
    if(registerUser && userPassword){
        res.status(200).send({msg:"user login successfully",data:token})
    }else{
    res.status(200).send({msg:"credential was wrong"})
    }
}

module.exports={UserSignUp,UserLogin,Alluser}

