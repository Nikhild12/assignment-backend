const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = mongoose.Schema({
  firstName:{ type: String,required:true },
  lastName:{ type: String,required:true },
  email:{ type: String,required:true },
  contactNumber:{ type: String,required:true },
  strength:{ type: Array,required:true},
  id:{ type: String,required:true}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);