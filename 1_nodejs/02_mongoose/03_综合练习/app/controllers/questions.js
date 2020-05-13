const topicsModel = require("../models/questions");
const usersModel = require("../models/users")

class Questions {
  async getAllQuestions(ctx) {
    let { pre_page, page, q = "" } = ctx.query;
    // 参数校验
    pre_page = Math.max(+pre_page, 1);
    page = Math.max(+page, 1);
    // 查询数据
    const questions = await topicsModel.find({ $or: [{ title: new RegExp(q) }, { desc: new RegExp(q) }] }).skip((page - 1) * pre_page).limit(pre_page);
    ctx.body = questions
  };
  async getQuestionByid(ctx) { };
  async addQuestion(ctx) { };
  async updateQuestionByid(ctx) { };
  async deleteQuestion(ctx) { };
  async listQuestionsFollowers(ctx) { };
}

module.exports = new Questions()