// 连接数据库
const mysql = require("mysql");
const config = require("./defaultConfig");

// 创建线程池(连接数据库的准备工作)
let pool = mysql.createPool({
  host: config.dataBase.HOST,
  user: config.dataBase.USERNAME,
  password: config.dataBase.PASSWORD,
  database: config.dataBase.DATABASE,
  port: config.dataBase.PORT,
  multipleStatements: true,
});

// 连接线程池，做sql查找
let allService = {
  query: function (sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        //连接数据库
        if (err) {
          reject(err);
        } else {
          //连接成功
          connection.query(sql, values, (err, rows) => {
            //执行 sql
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            connection.release(); //释放连接
          });
        }
      });
    });
  },
};

// 获取商品品牌信息
let productBrandInfo = function () {
  let _sql = `select * from brand;`;
  return allService.query(_sql);
};

// 获取商品规格信息
let productSizeInfo = function () {
  let _sql = `select * from size;`;
  return allService.query(_sql);
};

// tag配置信息
let tagInfo = function () {
  let _sql = `select id, name, color, remark from tag;`;
  return allService.query(_sql);
};

// tag配置信息
let getTagInfo = function (value) {
  let _sql = `select id, name, color, remark from tag where id=?;`;
  return allService.query(_sql, value);
};

// 用户登录
let userLogin = function (name, password) {
  let _sql = `select id,name from users where name="${name}" and password="${password}";`;
  return allService.query(_sql);
};

// 新增客户信息信息
let addClientInfo = function (value) {
  let _sql = `insert into client set id=?,name=?,telephone=?,address=?,remark=?,creator=?,mender=?,create_time=?,alter_time=?;`;
  return allService.query(_sql, value);
};

// 分页查询客户信息
let toLoadClientInfo = function (name, telephone, address, num, limits) {
  let _sql = `select id, name, telephone, address, remark from client where name like '%${name}%' and telephone like '%${telephone}%' and address like '%${address}%' order by alter_time desc limit ${num},${limits};`;
  return allService.query(_sql);
};

// 分页查询商品信息
let toLoadProductInfo = function (
  model_num,
  brand,
  size,
  price_head,
  price_foot,
  num,
  limits
) {
  let _sql_1 = `select id, brand, model_num, colour_num, size, repertory_carton_amount, retail_price, slice_num, remark from product where model_num like '%${model_num}%' and brand like '%${brand}%' and size like '%${size}%' order by alter_time desc limit ${num},${limits};`;
  let _sql_2 = `select id, brand, model_num, colour_num, size, repertory_carton_amount, retail_price, slice_num, remark from product where model_num like '%${model_num}%' and brand like '%${brand}%' and size like '%${size}%' and retail_price between ${price_head} and ${price_foot} order by retail_price asc limit ${num},${limits};`;
  let _sql = "";
  if (price_head == 0 && price_foot == 0) _sql = _sql_1;
  else _sql = _sql_2;
  return allService.query(_sql);
};

// 批量查询状态详情
let getProductDetail = function (list) {
  let _sql = `select * from product where id in (${list});`;
  return allService.query(_sql);
};

// 批量获取商品库存数量
let getProductRepertory = function (value) {
  let _sql = `select id,repertory_carton_amount,repertory_slice_amount, slice_num from product where id=?;`;
  return allService.query(_sql, value);
};

// 修改商品库存
let updateProductRepertory = function (value) {
  let _sql = `update product set repertory_carton_amount=?,repertory_slice_amount=? where id=?;`;
  return allService.query(_sql, value);
};

// 根据货单状态 - 分页查询货单信息
let toLoadWaybillInfo = function (num, limits, status_new) {
  let _sql = `select id, client_id, status_new, type, time, nopay_price, create_time, mender from waybill where status_new like '%${status_new}%' order by time desc limit ${num},${limits};`;
  return allService.query(_sql);
};

// 根据检索条件 - 分页查询货单信息 - (只有赊账和结算货单)
let searchWaybillInfo = function (
  num,
  limits,
  status_new,
  time_head,
  time_foot
) {
  let _sql = `select id, client_id, status_new, type, time, nopay_price, create_time, mender from waybill where status_new like '%${status_new}%'`;

  if (time_head && time_foot) {
    _sql = _sql + ` and time between ${time_head} and ${time_foot}`;
  }

  _sql = _sql + ` order by time desc limit ${num},${limits};`;

  return allService.query(_sql);
};

// 根据客户 id查询客户信息
let getClientInfo = function (id) {
  let _sql = `select * from client where id="${id}";`;
  return allService.query(_sql);
};

// 根据业务员 id查询业务员信息
let getUserInfo = function (id) {
  let _sql = `select id, name from users where id="${id}";`;
  return allService.query(_sql);
};

// 根据运费单 id查询司机信息
let getDriverInfo = function (id) {
  let _sql = `select * from driver where id in (select driver_id from freight where id="${id}");`;
  return allService.query(_sql);
};

// 批量查询司机详情
let getDriverDetail = function (list) {
  let _sql = `select * from driver where id in (${list});`;
  return allService.query(_sql);
};

// 批量添加客户订单信息
let addOrderInfo = function (value) {
  let _sql = `insert into orders (id,waybill_id,client_id,product_id,freight_id,unit_price,carton_amount,slice_amount,on_carton_amount,on_slice_amount,remark,creator,mender,create_time,alter_time) values ?`;
  return allService.query(_sql, [value]);
};

// 新增货单状态信息
let addWaybillLineInfo = function (value) {
  let _sql = `insert into status set id=?,waybill_id=?,type=?,remark=?,creator=?,mender=?,create_time=?,alter_time=?;`;
  return allService.query(_sql, value);
};

// 移除货单状态信息
let delWaybillLineInfo = function (value) {
  let _sql = `delete from status where id=?;`;
  return allService.query(_sql, value);
};

// 更新货单状态线信息
let setWaybillStatusInfo = function (value) {
  let _sql = `update waybill set status_new=?,status_line=?,mender=?,alter_time=? where id=?;`;
  return allService.query(_sql, value);
};

// 获取货单状态线
let getWaybillStatusLine = function (value) {
  let _sql = `select status_line from waybill where id=?;`;
  return allService.query(_sql, value);
};

// 新增货单信息
let addWaybillInfo = function (value) {
  let _sql = `insert into waybill set id=?,client_id=?,status_new=?,status_line=?,type=?,time=?,order_list=?,total_price=?,earnest_money=?,nopay_price=?,isVoid=?,remark=?,creator=?,mender=?,create_time=?,alter_time=?;`;
  return allService.query(_sql, value);
};

// 新增商品库存流量信息
let addProductFlow = function (value) {
  let _sql = `insert into flow set id=?,type=?,product_id=?,operate=?,num=?,remark=?,creator=?,mender=?,create_time=?,alter_time=?;`;
  return allService.query(_sql, value);
};

// 获取货单详情
let getWaybillDetail = function (value) {
  let _sql = `select * from waybill where id=?;`;
  return allService.query(_sql, value);
};

// 批量查询订单详情
let getOrderDetail = function (list) {
  let _sql = `select * from orders where id in (${list});`;
  return allService.query(_sql);
};

// 批量查询状态详情
let getStatusDetail = function (list) {
  let _sql = `select * from status where id in (${list});`;
  return allService.query(_sql);
};

module.exports = {
  // 用户
  userLogin,
  getUserInfo,

  // 客户
  addClientInfo,
  getClientInfo,
  toLoadClientInfo,

  // 商品
  toLoadProductInfo,
  getProductDetail,
  getProductRepertory,
  updateProductRepertory,

  // 货单
  toLoadWaybillInfo,
  searchWaybillInfo,
  addWaybillInfo,
  setWaybillStatusInfo,
  getWaybillStatusLine,
  getWaybillDetail,

  // 订单
  addOrderInfo,
  getOrderDetail,

  // 货单状态
  addWaybillLineInfo,
  delWaybillLineInfo,
  getStatusDetail,

  // 运单
  // getFreightDetail,

  // 司机
  getDriverInfo,
  getDriverDetail,

  // 下拉框配置信息
  productBrandInfo,
  productSizeInfo,

  // 流量控制信息
  addProductFlow,

  // tag配置信息
  tagInfo,
  getTagInfo,
};
