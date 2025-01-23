/**
 * 编写货单信息整合相关工具
 */
const userService = require("../controllers/userSqlConfig");
const { v1: uuidv1, v4: uuidv4 } = require("uuid"); // 生成随机ID
const time = require("../utils/time.js");

/**
 * 改变时间线状态
 * @param {*} key 状态关键字
 * @param {*} remark 状态备注
 * @param {*} waybillId 货单ID
 * @param {*} ispop 是否回退当前时间线上的状态
 * @param {*} userId 业务员ID
 */
const setLineStatus = async (key, remark, waybillId, ispop, userId) => {
  const statusId = uuidv4(); // 新增状态ID
  const creator = userId;
  const mender = userId;
  const create_time = time.getNowMilliSecond();
  const alter_time = time.getNowMilliSecond();

  const tagInfo = await userService.getTagInfo([key]); // 获取状态备注
  const statusRemake = remark || tagInfo[0].remark;
  const statusList = await userService.getWaybillStatusLine([waybillId]); // 获取货单状态时间线
  const _list = [...JSON.parse(statusList[0].status_line)]; // 状态时间线

  // 将key_end代表的状态从数据库中移除
  if (ispop) {
    // const end_id = _list[_list.length - 1];
    const end_id = _list.pop();
    await userService.delWaybillLineInfo([end_id]);
  }

  // 将最新的时间线和最新状态存入当前货单
  _list.push(statusId);
  await userService.setWaybillStatusInfo([
    key,
    JSON.stringify(_list),
    mender,
    alter_time,
    waybillId,
  ]);

  // 新增最新状态数据
  await userService.addWaybillLineInfo([
    statusId,
    waybillId,
    key,
    statusRemake,
    creator,
    mender,
    create_time,
    alter_time,
  ]);

  return Promise.resolve();
};

/**
 * 整合货单列表数据
 * @param {*} list 货单数组
 */
const getWaybillList = (list) => {
  const clientMap = {};
  const userMap = {};
  const driverMap = {};

  return list.map(async (i) => {
    // 请求客户名称
    if (!clientMap[i.client_id]) {
      const clientRes = await userService.getClientInfo(i.client_id);
      clientMap[i.client_id] = clientRes[0].name;
    }

    // 请求业务员名称
    if (!userMap[i.mender]) {
      const userRes = await userService.getUserInfo(i.mender);
      userMap[i.mender] = userRes[0].name;
    }

    // 请求司机名称
    /**
     * 注意！！！：司机运费信息已经从货单中移除，想要获取此类信息需从 order_list中获取
     */
    // if (!driverMap[i.freight_id]) {
    //   const driverRes = await userService.getDriverInfo(i.freight_id);
    //   driverMap[i.freight_id] = driverRes[0].name;
    // }

    return {
      ...i,
      client_name: clientMap[i.client_id],
      user_name: userMap[i.mender],
      // driver_name: driverMap[i.freight_id],
    };
  });
};


/**
 * 将数组转化为字符串
 * @param {*} list ID数组
 */
const getListString = (list) => {
  return list.map(i => JSON.stringify(i)).join(',');
};

module.exports = {
  setLineStatus,
  getWaybillList,
  getListString,
};
