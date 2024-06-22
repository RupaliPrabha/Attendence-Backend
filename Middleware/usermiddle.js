const jwt = require('jsonwebtoken');
require("dotenv").config()

//For verify token of user
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) {
        return res.status(401).send({ msg: "Access denied. No token provided." });
    }

    try {  
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        if(decoded){
        console.log(decoded,"decode")
        req.user = decoded;
        next();
        }
    } catch (error) {
      console.log(error)
        res.status(400).send({ msg: "Invalid token." });
    }
};

const userProfile=(req,res)=>{
    res.send("this is your profile");
}

module.exports={verifyToken,userProfile}
