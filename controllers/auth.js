const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Auth = require('../models/auth');

//Need Code//
exports.createUser = (req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash=>{
    const Auth_ = new Auth({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:hash
    });
    Auth_.save()
    .then(result =>{
      res.status(201).json({
        message:'User created',
        result:result
      })
    })
    .catch(err=>{
      res.status(500).json({
        error:'Invalud authentication credentials!'
      })
    })
  });
}

exports.userLogin = (req,res,next)=>{
  let fetchedUser;
  Auth.findOne({
    email:req.body.email
  }).then(async user=>{
    if(!user){
      return res.status(401).json({
        message:"Not Found"
      })
    }
    fetchedUser = user;
    return await bcrypt.compare(req.body.password,fetchedUser.password);
  }).then(result =>{
    if(result == false){
      return res.status(401).json({
        message:"Auth Failed"
      })
    }
    const token = jwt.sign({email:fetchedUser.email,userId:fetchedUser._id},"secret_this_should_be_longer",{ expiresIn:'1h' });
    res.status(200).json({
      token:token,
      expiresIn:3600,
      userId:fetchedUser._id
    })
  }).catch(err=>{
    console.log("err ",err);
    return res.status(401).json({
      message:"Invalud authentication credentials!"
    })
  })
}

//Need Code//

