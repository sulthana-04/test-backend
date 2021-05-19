const { Router } = require('express');
const router = require('express').Router();
const User = require('../models/Test');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../routes/validation');
const Test = require('../models/Test');
router.get('/getallusers', async  (req, res, next) => {
    try{
       const test = await Test.find();
      res.json(test);
      }catch(err){
       return res.json({ message:err });
   }
    });
    router.post('/getoneuser', async  (req, res, next) => {
        try{
           
            const test = await Test.findOne({email:req.body.email});
           if(!test){
            return res.status(400).send('Email is not found');
           } else{
               res.send({
                name: req.body.name,
                email: req.body.email,
                password:hashedPassword,
                mobile:req.body.mobile,
               gender:req.body.gender,
               state:req.body.state,
               district:req.body.district,
               address:req.body.address
                   
               })
           }

          }catch(err){
           return res.json({ message:err });
       }
        });
 
router.post('/register',async (req,res) => {
    
    //validate data
    const {error} = registerValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   //checkng  user
   const emailExist = await Test.findOne({email:req.body.email});
   if(emailExist) return res.status(400).send('Email already exist');

   //hash passwrd
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);
   
   //crt nw user
    const test = new Test({
        name: req.body.name,
        email: req.body.email,
        password:hashedPassword,
        mobile:req.body.mobile,
       gender:req.body.gender,
       state:req.body.state,
       district:req.body.district,
       address:req.body.address
    });
    try{
        const savedTest = await test.save();
        res.send({test: test._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//login
router.post('/login',async (req,res) =>{
    const {error} = loginValidation(req.body);
    if (error) return res.status(402).send(error.details[0].message);
    const test = await Test.findOne({email:req.body.email});
   if(!test) return res.status(400).send('Email is not found');
   //passwrd is crct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(401).send('Invalid password')

//crt n assgn tkn
const token = jwt.sign({_id: test._id},process.env.TOKEN_SECRET );
res.status(202).header('auth-token', token).send(token);
   });
module.exports = router;