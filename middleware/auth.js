const jwt = require('../utils/jwt.js')

const Auth = async (ctx, next) => {
    const { authorization = '' } = ctx.request.header;
    const token = authorization.replace('Bearer ', '');
    const info = jwt.verify(token);
    if (info) {
        ctx.state.user = info; // 将用户信息存放到 state中
    } else {
        ctx.throw(401, 'token error');
    }
    await next();
};

module.exports = {
    Auth
}
