const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

const username = process.env.USERNAME
const password = process.env.PASSWORD

mongoose.connect("mongodb+srv://tapasya162003:wpbWY7s2Mo0coloi@cluster0.2qdff.mongodb.net/regisrationDB",{
  //useNewUrlParser : true,
  //useUnifiedTopology : true,
})

//registration Schema
const registrationSchema = new mongoose.Schema({
  name:String,
  email:String,
  password:String,
});
//model of registration Schema
const registration = mongoose.model("Registration",registrationSchema);

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json());
app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/pages/pages/index.html");
})

app.post("/register",async(req,res)=>{
  try{
    const {name,email,password}=req.body;
    const existuser = await registration.findOne({email:email});
    //chech for existing user
    if(!existuser){
      const regData = new registration({
        name:String,
        email:String,
        password:String,
      });
      await regData.save();
      res.redirect("/success")
    }
    else{
      alert("user already exist");
      res.redirect("/error");
    }
    
  }
  catch(error){
    console.log(error)
    res.redirect("/error")
  }
})

app.get("/success",(req,res)=>{
  res.sendFile(__dirname + "/pages/pages/success.html")
})

app.get("/error",(req,res)=>{
  res.sendFile(__dirname + "/pages/pages/error.html")
})

app.listen(port,()=>(
  console.log(`Server Running at : https://localhost${port}`)
))  