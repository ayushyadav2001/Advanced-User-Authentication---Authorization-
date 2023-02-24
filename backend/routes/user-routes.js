const express=require("express");
const { signUp, login, verifyToken, getUser } = require("../controller/user-controller");
const router =express.Router();


router.post("/signup",signUp);
router.post("/login",login);
router.get('/user',verifyToken,getUser);


module.exports=router;