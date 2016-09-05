/**
 * Created by Administrator on 2016/8/10.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bearSchema=new Schema({
  name: String
});
module.exports=mongoose.model('bear',bearSchema);
