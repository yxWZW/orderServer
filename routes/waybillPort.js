const router = require("koa-router")();
const userService = require("../controllers/userSqlConfig");
const { v1: uuidv1, v4: uuidv4 } = require("uuid"); // 生成随机ID
const jwt = require("../utils/jwt.js");
const line = require("../utils/line.js");
const auth = require("../middleware/auth.js");
const time = require("../utils/time.js");
const flow = require("../utils/flowControl.js");

router.prefix("/waybill"); //公共前缀

// 根据货单状态 - 分页查询货单信息
router.post("/find", async (ctx, next) => {
  const limits = 8;

  const {
    current, // 当前页数
    status_new, // 当前货单最新状态
  } = ctx.request.body;
  let num = (current - 1) * limits;

  try {
    const waybillRes = await userService.toLoadWaybillInfo(
      num,
      limits,
      status_new
    );

    const returnList = await Promise.all(line.getWaybillList(waybillRes));

    ctx.body = {
      code: 200,
      data: returnList,
      mess: "请求成功",
    };
  } catch (err) {
    ctx.body = {
      code: "406",
      data: err,
      mess: "请求失败",
    };
  }
});

// 根据检索条件 - 分页查询货单信息
router.post("/search", async (ctx, next) => {
  const limits = 8;

  const {
    current, // 当前页数
    keyValue, // 检索属性词
    searchValue, // 检索关键词
    isNoPay, // 是否只显示赊账货单
    time_head, // 送货日期期间开始
    time_foot, // 送货日期期间结束
  } = ctx.request.body;
  let num = (current - 1) * limits;

  const status_new = isNoPay ? "pay_off" : "pay";

  try {
    const waybillRes = await userService.searchWaybillInfo(
      num,
      limits,
      status_new,
      time_head,
      time_foot
    );

    const returnList = await Promise.all(line.getWaybillList(waybillRes));

    ctx.body = {
      code: 200,
      data: returnList,
      mess: "请求成功",
    };
  } catch (err) {
    ctx.body = {
      code: "406",
      data: err,
      mess: "请求失败",
    };
  }
});

// 新增货单信息
router.post("/add", async (ctx, next) => {
  const {
    clientInfo,
    startTime,
    orderList,
    waybillRemark,
    total,
    earnestMoney,
    userId,
  } = ctx.request.body;
  const { clientId, name, telephone, address, clientRemark } = clientInfo;
  const creator = userId;
  const mender = userId;
  const create_time = time.getNowMilliSecond();
  const alter_time = time.getNowMilliSecond();

  try {
    const _clientId = clientId || uuidv4(); // 当前货单所属客户ID
    const _waybillId = uuidv4(); // 当前创建的货单ID
    const _orderList = []; // 当前货单包含的订单ID

    // 当 clientId不存在时，存入新客户
    if (!clientId) {
      await userService.addClientInfo([
        _clientId,
        name,
        telephone,
        address,
        clientRemark,
        creator,
        mender,
        create_time,
        alter_time,
      ]);
    }

    /**
     * 批量存储订单信息
     * ！！！注意：当订单所对应的运费表id不存在时，统一使用'f000'进行填充
     */
    const orderInfo = orderList.map((i) => {
      const _orderId = uuidv4(); // 订单ID
      _orderList.push(_orderId);
      return [
        _orderId,
        _waybillId,
        _clientId,
        i.product_id,
        "f000",
        i.unit_price,
        i.carton_amount,
        i.slice_amount,
        i.carton_amount,
        i.slice_amount,
        i.remark,
        creator,
        mender,
        create_time,
        alter_time,
      ];
    });
    await userService.addOrderInfo(orderInfo);

    /**
     * 进行对应商品数量的扣除
     */
    flow.subRepertoryNum(orderList, userId);

    /**
     * 存储货单信息
     */
    await userService.addWaybillInfo([
      _waybillId, // 货单ID
      _clientId, // 客户ID
      "", // 最新状态
      JSON.stringify(""), // 状态时间线
      "go_goods", // 货单类型
      startTime, // 送货时间
      JSON.stringify(_orderList), // 订单列表
      total, // 总价
      earnestMoney, // 定金
      0, // 赊账
      false,
      waybillRemark, // 货单备注
      creator,
      mender,
      create_time,
      alter_time,
    ]);
    /**
     * 存放货单状态时间线
     */
    await line.setLineStatus("order_over", "", _waybillId, false, userId); // 新增货单完成状态
    await line.setLineStatus("driver_off", "", _waybillId, false, userId); // 新增未联系司机状态

    ctx.body = {
      code: 200,
      data: "",
      mess: "新增成功",
    };
  } catch (err) {
    ctx.body = {
      code: "406",
      data: err,
      mess: "新增失败",
    };
  }
});

// 货单详情信息
router.post("/detail", async (ctx, next) => {
  const { waybillId, userId } = ctx.request.body;

  try {
    const waybillRes = await userService.getWaybillDetail([waybillId]);
    const waybillDetail = waybillRes[0];
    const { client_id, order_list, status_line } = waybillDetail;

    console.log("1---------wzw----------waybillDetail", waybillDetail);

    // 获取客户信息
    const clientRes = await userService.getClientInfo(client_id);

    console.log("2---------wzw----------clientRes", clientRes);

    // 获取订单列表
    const orderList = JSON.parse(order_list);
    const orderRes = await userService.getOrderDetail(
      line.getListString(orderList)
    );

    console.log("3---------wzw----------orderRes", orderRes);

    // 获取货单状态列表
    const statusList = JSON.parse(status_line);
    const statusRes = await userService.getStatusDetail(
      line.getListString(statusList)
    );

    console.log("4---------wzw----------statusRes", statusRes);

    // 整合运单和司机信息
    let freightDriverMap = {};
    const freightList = orderRes.map((i) => i.freight_id);
    const freightListSync = [...new Set(freightList)].map(async (i) => {
      const driverRes = await userService.getDriverInfo(i);
      console.log("44444---------wzw----------driverRes", driverRes);
      freightDriverMap = {
        ...freightDriverMap,
        [i]: {
          freight_id: i,
          driverInfo: driverRes[0],
          orderList: [],
        },
      };
    });
    await Promise.all(freightListSync);

    console.log("5---------wzw----------freightDriverMap", freightDriverMap);

    // 获取商品列表
    const productList = orderRes.map((i) => i.product_id);
    const productRes = await userService.getProductDetail(
      line.getListString(productList)
    );

    console.log("6---------wzw----------productRes", productRes);

    let productMap = {};
    productRes.forEach((i) => {
      productMap = {
        ...productMap,
        [i.id]: i,
      };
    });

    console.log("7---------wzw----------productMap", productMap);

    // 整合订单和商品信息
    const orderProductList = orderRes.map((i) => {
      return {
        ...i,
        productInfo: productMap[i.product_id],
      };
    });

    console.log("8---------wzw----------orderProductList", orderProductList);

    // 整合司机订单和商品信息
    orderProductList.map((i) => {
      const orderList = freightDriverMap[i.freight_id].orderList;
      freightDriverMap[i.freight_id].orderList = [...orderList, i];
    });

    console.log("9---------wzw----------freightDriverMap", freightDriverMap);

    const waybillInfo = {
      ...waybillDetail,
      clientInfo: clientRes[0],
      statusInfo: statusRes,
      freightOrderInfo: Object.values(freightDriverMap),
    };

    console.log("10---------wzw----------waybillInfo", waybillInfo);

    ctx.body = {
      code: 200,
      data: waybillInfo,
      mess: "查询成功",
    };
  } catch (err) {
    ctx.body = {
      code: "406",
      data: err,
      mess: "查询失败",
    };
  }
});

module.exports = router;
