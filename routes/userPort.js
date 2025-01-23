const router = require("koa-router")();
const userService = require("../controllers/userSqlConfig");
const { v1: uuidv1 } = require("uuid"); // 生成随机ID
const jwt = require("../utils/jwt.js");
const auth = require("../middleware/auth.js");

router.prefix("/user"); //公共前缀

// 获取商品规格信息
router.post("/get/tag", async (ctx, next) => {
  await userService
    .tagInfo()
    .then((res) => {
      ctx.body = {
        code: 200,
        data: res,
        mess: "请求成功",
      };
    })
    .catch((err) => {
      ctx.body = {
        code: "406",
        data: err,
        mess: "请求失败",
      };
    });
});

// 登录接口
router.post("/login", async (ctx, next) => {
  // 拿到前端的参数
  let _username = ctx.request.body.username;
  let _password = ctx.request.body.password;

  // 去数据库里匹配数据
  await userService
    .userLogin(_username, _password)
    .then((res) => {
      // 向前端返回内容
      if (res.length) {
        let result = {
          id: res[0].id,
          name: res[0].name,
        };
        let token = jwt.generate(result, "1d");
        ctx.body = {
          code: 200,
          data: {
            id: res[0].id,
            name: res[0].name,
            token,
          },
          mess: "登录成功",
        };
      } else {
        ctx.body = {
          code: 406,
          data: "error",
          mess: "账号、密码有误或用户不存在",
        };
      }
    })
    .catch((err) => {
      ctx.body = {
        code: 407,
        data: err,
        mess: "服务器出错",
      };
    });
});

module.exports = router;
