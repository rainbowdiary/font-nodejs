const Router = require("koa-router");
const questionsRouter = new Router({ prefix: "/questions" });
const { getAllQuestions,
  getQuestionByid,
  addQuestion,
  updateQuestionByid,
  deleteQuestion,
  listQuestionsFollowers
} = require("../controllers/questions");
const { auth, questionsExist, questionsIsLogin } = require("../middlewares");
// 查询: 公开的，不需要业务校验
// 非查询: 业务上要校验

// 列出所有话题
questionsRouter.get("/", getAllQuestions)
//  获取话题通过id
questionsRouter.get("/:id", questionsExist, getQuestionByid)
// 新增话题
questionsRouter.post("/", auth, questionsExist, addQuestion)
//  修改话题通过id
questionsRouter.patch("/:id", auth, questionsExist, updateQuestionByid)
//  删除话题通过id
questionsRouter.delete("/:id", auth, questionsExist, questionsIsLogin, deleteQuestion)
//  获取话题的关注者
questionsRouter.get("/:id/followers", questionsExist, questionsIsLogin, listQuestionsFollowers)

module.exports = questionsRouter;