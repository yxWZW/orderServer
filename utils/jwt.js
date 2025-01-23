const jwt = require("jsonwebtoken");
const secret = '113Bmongojsdalkfnxcvmas';

/**
 * 
 * @param {*} value 用户 id信息
 * @param {*} expires token有效时间
 */
const generate = (value, expires) => {  // 创建 token
    try {
        return jwt.sign(value, secret, { expiresIn: expires });
    } catch (e) {
        return '';
    }
}
const verify = (token) => {  // 查看 token
    try {
        return jwt.verify(token, secret); // 如果过期将返回false
    } catch (e) {
        return false;
    }
}

module.exports = {
    generate,
    verify
}
