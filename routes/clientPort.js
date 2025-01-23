const router = require("koa-router")();
const userService = require("../controllers/userSqlConfig");
const { v1: uuidv1 } = require("uuid"); // 生成随机ID
const jwt = require("../utils/jwt.js");
const auth = require("../middleware/auth.js");
const time = require('../utils/time.js');


router.prefix("/client"); //公共前缀

// 分页查询客户信息
router.post("/find", async (ctx, next) => {
  const limits = 8;

  const {
    current, // 当前页数
    name,
    telephone,
    address,
  } = ctx.request.body;
  let num = (current - 1) * limits;

  await userService
    .toLoadClientInfo(name, telephone, address, num, limits)
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

// 新增客户信息
router.post("/add", async (ctx, next) => {
  const { name, telephone, address, remark, userId } =  ctx.request.body;

  const id = uuidv1();
  const creator = userId;
  const mender = userId;
  const create_time = time.getNowMilliSecond();
  const alter_time = time.getNowMilliSecond();

  await userService
    .addClientInfo([
      id,
      name,
      telephone,
      address,
      remark,
      creator,
      mender,
      create_time,
      alter_time,
    ])
    .then((res) => {
      if (res.affectedRows) {
        ctx.body = {
          code: 200,
          data: "ok",
          mess: "添加成功",
        };
      } else {
        ctx.body = {
          code: "406",
          data: "error",
          mess: "添加失败",
        };
      }
    });
});

module.exports = router;
