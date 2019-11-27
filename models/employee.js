let mongoose = require('mongoose');

//employees schema
let employeSchema = mongoose.Schema({
  eID:{
    type: Number
  },
  name:{
    type: String
  },
  address:{
    type: String
  },
  dob:{
    type: String
  },
  eName:{
    type: String
  },
  aCredit:{
    type: Number
  }
});

let Employee = module.exports = mongoose.model('Employee', employeSchema);
