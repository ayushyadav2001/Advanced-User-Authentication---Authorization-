const express =require("express");
const mongoose=require("mongoose");
const router =require('./routes/user-routes')
const PORT=3000;
const cookieParser=require("cookie-parser");


const app =express();

// Middlewares 
app.use(express.json());
app.use(cookieParser());
app.use("/api",router);


mongoose.connect("mongodb+srv://admin:DqaZ6AupGr8QAQ1o@cluster0.ot7j1hb.mongodb.net/auth?retryWrites=true&w=majority").then(()=>{
app.listen(PORT);
console.log(`Database is Connected and i am is Listening at http://localhost:${PORT}/api`);

}).catch((err)=>{
    console.log(err);
})
















// DqaZ6AupGr8QAQ1o

