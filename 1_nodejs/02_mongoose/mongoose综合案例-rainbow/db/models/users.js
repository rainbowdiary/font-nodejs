const { model } = require("mongoose")
const UsersModel = model('Users', { name: String, age: Number });
module.exports = UsersModel;