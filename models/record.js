let mongoose = require('mongoose');

//employees schema
let recordSchema = mongoose.Schema({
  name:{
    type: String
  },
  cAmount:{
    type: Number
  },
  date:{
    type: Date,
    default: Date.now
  },
  rAmount:{
    type: String
  }
});

recordSchema.virtual('updated_date').get(function () {
  return dateformat(this.updated, 'dddd, mmmm dd, yyyy. HH:MM');
});

let Record = module.exports = mongoose.model('Record', recordSchema);
