const bcrypt=require("bcryptjs");
const User=require("../model/User");
const JWT_SECERET_KEY="Mykey";
const jwt=require("jsonwebtoken");


const signUp= async (req,res,next)=>{
    const {name,email,password}=req.body;
    let exisitingUser;
    try{
        exisitingUser=await User.findOne({email:email});

    }
    catch(err){
        console.log(err); 

    }
    if(exisitingUser){
        return res.status(400).json({message:"User already exist! Login Insted"});
    }

    const hashedPassword=bcrypt.hashSync(password);
    const user=new User({
        // name:name,
        // email:email,
        // password:password
        // work as above smae as ES6
        name,
        email,
        password:hashedPassword
    })
    try{
        await user.save();
    }
    catch(err){
        console.log(err);

    }
    return res.status(201).json({message:user});

}

const login= async(req,res,next)=>{
    const {email,password}=req.body;
    let exisitingUser;
    try{
        exisitingUser=await User.findOne({email:email});
    }
    catch(err){
        // console.log(err);
        return new Error(err);
    }
    if(!exisitingUser){
        return res.status(400).json({message:"User Not found Please Signup!"})
    }
    const isPasswordCorrect=bcrypt.compareSync(password,exisitingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Invalid Email or Password"});
    }
    const token=jwt.sign({id:exisitingUser._id},JWT_SECERET_KEY,{
        expiresIn:"30s"
    })
    res.cookie(String(exisitingUser._id),token,{
        path:'/',
        expires:new Date(Date.now()+1000*30),
        httpOnly:true,
        sameSite:"lax"

    })
    return res.status(200).json({message:"login Successful",user:exisitingUser,token});
}

const verifyToken=(req,res,next)=>{

    const cookies=req.headers.cookie;
    const token=cookies.split("=")[1];
    // console.log(cookies);
    console.log(token);
    if (!token) {
        res.status(404).json({ message: "No token found" });
      }
      jwt.verify(String(token),JWT_SECERET_KEY,(err,user)=>{
        if(err){
            return res.status(400).json({ message: "Invalid Token" });
        }
        // console.log(user.id);
        req.id = user.id;
      })
      next();

}
const getUser=async (req,res,next)=>{
    const userId=req.id;
    let user;
    try{
        user=await User.findById(userId,"-password");
    }
    catch(err){
        return new Error(err);
    }
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({user});

}
exports.signUp=signUp;
exports.login=login;
exports.verifyToken=verifyToken;
exports.getUser=getUser;