/**
 * 编写商品库存流量控制的相关工具
 */
const userService = require("../controllers/userSqlConfig");
const { v1: uuidv1, v4: uuidv4 } = require("uuid"); // 生成随机ID
const time = require("../utils/time.js");

/**
 * 商品 ‘入’ 库操作
 * @param {*} list 商品列表
 * @param {*} userId 用户ID
 */
const incRepertoryNum = async (list, userId) => {
  const creator = userId;
  const mender = userId;
  const create_time = time.getNowMilliSecond();
  const alter_time = time.getNowMilliSecond();

  list.map(async (i) => {
    const listNum = await userService.getProductRepertory([i.product_id]);
    let repertory_carton_amount = productInfo[0].repertory_carton_amount; // 库存箱数
    let repertory_slice_amount = productInfo[0].repertory_slice_amount; // 库存片数
    let carton_amount = i.carton_amount; // 变化箱数
    let slice_amount = i.slice_amount; // 变化片数

    const tagInfo_in = await userService.getTagInfo(["in_storage"]); // 获取“正常入库”状态备注

    //   箱数流量控制
    await userService.addProductFlow([
      uuidv4(),
      "in_storage",
      i.product_id,
      "repertory_carton_amount",
      carton_amount,
      tagInfo_in[0].remark,
      creator,
      mender,
      create_time,
      alter_time,
    ]);

    //   片数流量操作
    await userService.addProductFlow([
      uuidv4(),
      "in_storage",
      i.product_id,
      "repertory_slice_amount",
      slice_amount,
      tagInfo_in[0].remark,
      creator,
      mender,
      create_time,
      alter_time,
    ]);

    //   修改商品库存
    await userService.updateProductRepertory([
      repertory_carton_amount + carton_amount,
      repertory_slice_amount + slice_amount,
      i.product_id,
    ]);
  });
};

/**
 * 商品 ‘出’ 库操作
 * @param {*} list 商品列表
 * @param {*} userId 用户ID
 */
const subRepertoryNum = async (list, userId) => {
  const creator = userId;
  const mender = userId;
  const create_time = time.getNowMilliSecond();
  const alter_time = time.getNowMilliSecond();

  list.map(async (i) => {
    const productInfo = await userService.getProductRepertory([i.product_id]);
    let repertory_carton_amount = productInfo[0].repertory_carton_amount; // 库存箱数
    let repertory_slice_amount = productInfo[0].repertory_slice_amount; // 库存片数
    let carton_amount = i.carton_amount; // 变化箱数
    let slice_amount = i.slice_amount; // 变化片数

    // 如果剩余片数不足以出库
    const isSplit = Number(slice_amount) > Number(repertory_slice_amount);
    if (isSplit) {
      carton_amount++;
      slice_amount = productInfo[0].slice_num - slice_amount;
    }

    const tagInfo_out = await userService.getTagInfo(["out_storage"]); // 获取“正常出库”状态备注
    const tagInfo_split = await userService.getTagInfo(["split_storage"]); // 获取“整箱拆分入库”状态备注

    //   箱数流量控制
    await userService.addProductFlow([
      uuidv4(),
      "out_storage",
      i.product_id,
      "repertory_carton_amount",
      carton_amount,
      tagInfo_out[0].remark,
      creator,
      mender,
      create_time,
      alter_time,
    ]);

    //   片数流量操作
    if(slice_amount) {
      await userService.addProductFlow([
        uuidv4(),
        isSplit ? "split_storage" : "out_storage",
        i.product_id,
        "repertory_slice_amount",
        slice_amount,
        isSplit ? tagInfo_split[0].remark : tagInfo_out[0].remark,
        creator,
        mender,
        create_time,
        alter_time,
      ]);
    }

    //   修改商品库存
    await userService.updateProductRepertory([
      repertory_carton_amount - carton_amount,
      isSplit
        ? repertory_slice_amount + slice_amount
        : repertory_slice_amount - slice_amount,
      i.product_id,
    ]);
  });
};

module.exports = {
  incRepertoryNum,
  subRepertoryNum,
};
