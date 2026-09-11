const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')

const JWT_SECRET='Salimisehre$r'

router.post('/',[ 
    body('name',"name should be 6 characters long").isLength({min:6}),
    body('email', "email should have a proper email format").isEmail()
    ,body('password',"password should have a minimum length of 5 characters").isLength({ min: 5 })],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400)
            .json({ errors: errors.array() });
    }
    //checking if an email already exists in the database
    const userr=await User.findOne({email:req.body.email})
    if(userr){
        res.send("Sorry the email already exists")
    }
    const salt= await bcrypt.genSalt(10);
     const secPass=await bcrypt.hash(req.body.password,salt)


//creating a user in the database if not present 
   user= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    });
    const data={
        user:{
            id:user.id
        }
    }
    const jwtData=jwt.sign(data,JWT_SECRET)
    console.log(jwtData)
    
    res.json(jwtData)
  
});

module.exports=router;