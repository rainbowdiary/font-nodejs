// 引入数据库集合
const UsersModel = require("../db/models/users");
// 返回的是一个promise

class Users {

  async getAll(ctx) {
    // console.log(a);  koa-json-error错误测试 500错误
    const users = await UsersModel.find();
    ctx.body = users
  };
  async addUser(ctx) {
    /*    ctx.verifyParams({
         name: { type: "string", required: true },
         age: { type: "number", required: true }
       }); */
    const { name, age } = ctx.request.body
    const user = await UsersModel.create({ name, age });
    ctx.body = user
  };
  /* 
  手动抛出的错误
    - 501 方法未实现 
    - 405 方法允许
    - 412 先决条件失败
    - 422 参数校验失败
  */
  getUserById(ctx) {
    ctx.verifyParams({
      id: { type: "string", required: true },
    });
    const id = +ctx.params.id
    if (id < 0) { ctx.throw(412, "id 不能是负数") }
    const user = users.find((user) => user.id === id)
    ctx.body = user
  };
  updateUserById(ctx) {
    const id = +ctx.params.id
    let { name, age } = ctx.request.body
    console.log(ctx.request.body);
    let user = users.find((user) => user.id === id)
    if (user) {
      name ? user.name = name : ""  //返回的是数组里面user的地址址
      age ? user.age = age : "" //为什么数组里面的数据会改变
      ctx.body = user
    } else {
      ctx.body = "id所在user不存在"
    }

  };
  delUserById(ctx) {
    const id = +ctx.params.id
    const index = users.findIndex((user) => user.id === id)
    console.log(id, index);

    users.splice(index, 1)
    ctx.status = 204
    // ctx.body = users  // users没有减少
  };

}
module.exports = new Users();