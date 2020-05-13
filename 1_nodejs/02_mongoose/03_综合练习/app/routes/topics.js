const Router = require("koa-router");
const topicsRouter = new Router({ prefix: "/topics" });
const { getAllTopics,
  getTopicByid,
  addTopic,
  updateTopicByid,
  deleteTopic,
  listTopicsFollowers
} = require("../controllers/topics");
const { auth, access, topicsExist } = require("../middlewares");
// 查询: 公开的，不需要业务校验
// 非查询: 业务上要校验

// 列出所有话题
topicsRouter.get("/", getAllTopics)
//  获取话题通过id
topicsRouter.get("/:id", topicsExist, getTopicByid)
// 新增话题
topicsRouter.post("/", auth, topicsExist, addTopic)
//  修改话题通过id
topicsRouter.patch("/:id", auth, topicsExist, updateTopicByid)
//  删除话题通过id
topicsRouter.delete("/:id", auth, topicsExist, deleteTopic)
//  获取话题的关注者
topicsRouter.get("/:id/followers", topicsExist, listTopicsFollowers)

//  列出话题下的所有问题

module.exports = topicsRouter;