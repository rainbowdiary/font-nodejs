const topicsModel = require("../models/topics");
const usersModel = require("../models/users")
class Topics {
  // 列出所有话题
  async getAllTopics(ctx) {  //实现分页+模糊查询
    let { pre_page, page, q = "" } = ctx.query;
    // 参数校验
    pre_page = Math.max(+pre_page, 1);
    page = Math.max(+page, 1);
    // 查询数据
    const topics = await topicsModel.find({ name: new RegExp(q) }).skip((page - 1) * pre_page).limit(pre_page);
    ctx.body = topics
  }

  //  获取话题通过id
  async getTopicByid(ctx) {
    const { fields } = ctx.query
    const selectFields = fields.split(";").filter(item => item).map(item => `+${item}`).join(" ")
    const topic = await (await topicsModel.findById(ctx.params.id)).isSelected(selectFields)
    // 中间件topicsExist已经查询到topic
    ctx.body = topic
  }

  // 新增话题
  async addTopic(ctx) {
    const { name } = ctx.request.body;
    console.log(name);
    const topics = await topicsModel.create(ctx.request.body);
    ctx.body = topics
  };

  //  修改话题通过id
  async updateTopicByid(ctx) {

  };

  //  删除话题通过id
  async deleteTopic(ctx) {

  };

  //列出话题的关注者
  async listTopicsFollowers() {
    const { id } = ctx.params;
    const users = await usersModel.find({ followerTopics: id })
  }
}
module.exports = new Topics();