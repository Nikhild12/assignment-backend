// const bcrypt = require('bcryptjs');
// const jwt = require("jsonwebtoken");
const User = require('../models/user');
// const User = require('../models/auth');


exports.deleteAllUsers = (req,res,next) =>{
  User.deleteMany(()=>{}).then(documents =>{
    res.status(200).json({
      message:"Users are deleted",
      users:documents,
    })
  }).catch(err=>{
    res.status(500).json({
      message:"Internal server error"
    })
  })

}

exports.createUser = (req,res,next)=>{
    console.log("Inside createUser");
      const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        contactNumber:req.body.contactNumber,
        strength:req.body.strength,
        id:req.body.id
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
          error:err
        })
      })
   
  }

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
      email:req.body.email,
      contactNumber:req.body.contactNumber,
      strength:req.body.strength
    };
   if(user.firstName || user.lastName || user.email || user.contactNumber || user.strength)
   {
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
  