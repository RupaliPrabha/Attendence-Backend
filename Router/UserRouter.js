const express =require("express")
const router = express.Router()

const {UserSignUp,UserLogin,Alluser}=require("../Controller/userController")
const{verifyToken,userProfile}=require("../Middleware/usermiddle")

router.post('/signup',UserSignUp);
router.post('/login',UserLogin);
router.get("/alluser",Alluser)
router.get('/miduser',verifyToken,userProfile)

module.exports=router;