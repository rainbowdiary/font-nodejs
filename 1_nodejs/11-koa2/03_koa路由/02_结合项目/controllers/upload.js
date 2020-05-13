class Upload {

  uploadFile(ctx) {
    console.log(ctx.request.body);
    ctx.body = "数据上传成功";
    ctx.status = 204
  };
  addUser(ctx) {
    id++;
    ctx.verifyParams({
      name: { type: "string", required: true },
      age: { type: "number", required: true }
    });
    const { name, age } = ctx.request.body
    const user = { id, name, age };
    users.push(user)
    ctx.body = user
  };
  /* 
  手动抛出的错误
    - 501 方法未实现 
    - 405 方法允许
    - 412 先决条件失败
    - 422 参数校验失败
  */
}
module.exports = new Upload();