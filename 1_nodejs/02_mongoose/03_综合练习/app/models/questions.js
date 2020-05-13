const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const questionsSchema = Schema({
  __v: { type: Number, select: false },
  title: { type: String, select: true },
  desc: { type: String },
  //用户和问题=1:多
  questioner: { type: Schema.Types.ObjectId, ref: "Users" },
  topics: {
    type: Schema.Types.ObjectId, ref: "Topics",
    select: false
  }
})

module.exports = questionsSchema