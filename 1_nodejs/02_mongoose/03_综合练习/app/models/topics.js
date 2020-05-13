const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/* 
名称: name
图标: avartar
简介: introduction
*/
const topicsSchema = Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  avartar: { type: String },
  introduction: { type: String },
  //代表当前的用户关注了谁?
  //代表当前用户的粉丝?
  //following最好设计成用户关注的对象(有限的数据)

});
module.exports = model('Topics', topicsSchema);