const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const answersSchema = Schema({
  __v: { type: Number, select: false },
  title: { type: String, select: true },
  desc: { type: String },
  //用户和问题=1:多
  answerer: { type: Schema.Types.ObjectId, ref: "Users" },
  topics: {
    type: Schema.Types.ObjectId, ref: "Topics",
    select: false
  },
  answers: {
    type: {
      content: { type: String, require: true },
      answerner: { type: String, require: true },
    },
  }
})

module.exports = answersSchema