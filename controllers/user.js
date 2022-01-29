const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user');

//Need Code//
exports.createUser = (req,res,next)=>{
  bcrypt.hash(req.body.password,10)
  .then(hash=>{
    const user = new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      password:hash
    });
    user.save()
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
  User.findOne({
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

exports.getAllUsers = (req,res,next)=>{
  User.find().then(documents =>{
    res.status(200).json({
      message:"Users are fetched",
      users:documents,
    })
  }).catch(err=>{
    res.status(500).json({
      message:"Internal server error"
    })
  })
}

exports.getUserById = (req,res,next) =>{
  User.findById(req.params.id).then(user=>{
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).json({message:"User not found"});
    }
  }).catch(err=>{
    res.status(500).json({
      message:'Error in fetching user'
    })
  })
}

exports.deleteUserById = (req,res,next) =>{
  User.deleteOne({_id:req.params.id}).then(result=>{
    res.status(200).json({message:'User deleted successfully',user:result})
  })
}

exports.updateUserById = (req,res,next) =>{
  const user = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email
  };
 if(user.firstName || user.lastName || user.email){
  User.findByIdAndUpdate(req.params.id,user).then(result=>{
    if(result) {
      res.status(200).json({user:result,message:'Update Successfully'});
    }else{
      res.status(404).json({message:'User not found'});
    }
  }).catch(err=>{
    res.status(500).json({message:'Internal Server Error!'});
  })
 }else{
   res.status(400).json({message:'Bad request'})
 }
}
