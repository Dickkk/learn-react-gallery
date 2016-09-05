/**
 * Created by chaoice3240 on 2016/9/1.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var deprdtSchema=new Schema({
  prdt_no: String,
  debase:{prdt_type:String,prdt_knd:String},
  derate:{rate_type:String,rate_chrg_type:String,rate_code:String,rate_rule:[{sect_atm:String,sect_date:String,rate_code:String}]}

});
module.exports=mongoose.model('deprdt',deprdtSchema);
