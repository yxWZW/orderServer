const router = require('koa-router')();
const userService = require('../controllers/mySqlConfig');
const {
    v1: uuidv1
} = require('uuid');
const auth = require('../middleware/auth.js');
const time = require('../utils/time.js');
const crypto = require('crypto');

router.prefix('/pet'); //公共前缀

// 创建用户的宠物信息
router.post('/add', async (ctx, next) => {
    await auth.Auth(ctx, next);
    let user = ctx.state.user;

    let _petid = uuidv1();
    let _userid = user.id;
    let _petname = ctx.request.body.petname;
    let _petbreed = ctx.request.body.petbreed;
    let _petage = ctx.request.body.petage;
    let _petweight = ctx.request.body.petweight;
    let _petcolor = ctx.request.body.petcolor;
    let _petsex = ctx.request.body.petsex;
    let _petcategory = ctx.request.body.petcategory;
    let _petmessage = ctx.request.body.petmessage;
    let _petimg = ctx.request.body.petimg;
    let _ctime = time.getNowMilliSecond();

    await userService.addUserPet([_petid, _userid, _petname, _petbreed, _petage, _petweight, _petcolor, _petsex, _petcategory, _petmessage, _petimg, _ctime]).then(res => {
        if (res.affectedRows) {
            ctx.body = {
                code: 200,
                data: 'ok',
                mess: '添加成功'
            }
        } else {
            ctx.body = {
                code: '406',
                data: 'error',
                mess: '添加失败'
            }
        }
    })
});

// 分页查询宠物信息
router.get('/find', async (ctx, next) => {
    const {
        current,
        limits,
        type
    } = ctx.query;
    let num = (current - 1) * limits;
    console.log(num, limits, type);

    await userService.toLoadPetInfo([type, num, limits]).then(res => {
        ctx.body = {
            code: 200,
            data: res,
            mess: '请求成功'
        }
    }).catch(err => {
        ctx.body = {
            code: '406',
            data: err,
            mess: '请求失败'
        }
    })
});

// 根据用户 id查找用户的宠物
router.post('/petlist', async (ctx, next) => {

    await auth.Auth(ctx, next);
    let user = ctx.state.user;
    let _userid = user.id;

    await userService.findPetInfoByUserId(_userid).then(res => {
        ctx.body = {
            code: 200,
            data: res,
            mess: '请求成功'
        }
    }).catch(err => {
        ctx.body = {
            code: '406',
            data: err,
            mess: '请求失败'
        }
    })

});

// 修改宠物信息
router.post('/updataPet', async (ctx, next) => {

    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;
    let _petid = ctx.request.body.data.petid;
    let _petname = ctx.request.body.data.petname;
    let _petbreed = ctx.request.body.data.petbreed;
    let _petage = ctx.request.body.data.petage;
    let _petweight = ctx.request.body.data.petweight;
    let _petcolor = ctx.request.body.data.petcolor;
    let _petsex = ctx.request.body.data.petsex;
    let _petcategory = ctx.request.body.data.petcategory;
    let _petmessage = ctx.request.body.data.petmessage;

    await userService.updatePetInfoByUserId([_petname, _petbreed, _petage, _petweight, _petcolor, _petsex, _petcategory, _petmessage, _userid, _petid]).then(res => {
        if (res.affectedRows) {
            ctx.body = {
                code: 200,
                data: 'ok',
                mess: '修改成功'
            }
        } else {
            ctx.body = {
                code: '406',
                data: 'error',
                mess: '修改失败'
            }
        }
    })

});

// 删除宠物信息
router.post('/deletePet', async (ctx, next) => {
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;
    let _petid = ctx.request.body.petid;

    await userService.deletePetInfoByPetIdAndUserId([_userid, _petid]).then(res => {
        if (res.affectedRows) {
            ctx.body = {
                code: 200,
                data: 'ok',
                mess: '删除成功'
            }
        } else {
            ctx.body = {
                code: '406',
                data: 'error',
                mess: '删除失败'
            }
        }
    })
})

// 根据宠物 id查询宠物主页信息
router.post('/petSpace', async (ctx, next) => {
    let {
        petid,
        hostid
    } = ctx.request.body;
    let _userinfo = {};
    let _petinfo = {};

    await userService.getUser(hostid).then(res => {
        const result = res[0];
        _userinfo = {
            ...result
        };
    })

    await userService.getPet(petid).then(res => {
        const result = res[0];
        _petinfo = {
            ...result
        };
    })

    if (_userinfo !== null && _petinfo !== null) {
        ctx.body = {
            code: 200,
            data: {
                userInfo: _userinfo,
                petInfo: _petinfo
            },
            mess: '请求成功'
        }
    } else {
        ctx.body = {
            code: '406',
            data: new Error(),
            mess: '请求失败'
        }
    }

})

// 返回 OSS对象配置信息
router.post('/uploadInfo', async (ctx, next) => {
    const config = {
        dirPath: 'pet/xxxxxx/',  // 文件存放到哪个目录下
        bucket: 'petimg-xxxx',  // bucketName
        host: 'http://petimg-xxxxx.oss-cn-xxxx.xxxxx.com',  //自己的地址
        accessKeyId: 'xxxxxxxxxx',  //自己的key
        accessKeySecret: 'xxxxxxxxxxxxxxxxxxx',  //自己的 KeySecret
        expAfter: 300000,  // 签名失效时间，毫秒
        maxSize: 1048576000  // 文件最大的 size
    }
    const expireTime = new Date().getTime() + config.expAfter;
    const expiration = new Date(expireTime).toISOString();
    const policyString = JSON.stringify({
        expiration,
        conditions: [
            ['content-length-range', 0, config.maxSize],
            ['starts-with', '$key', config.dirPath]
        ]
    })
    const policy = Buffer.from(policyString).toString('base64');

    const signature = crypto.createHmac('sha1', config.accessKeySecret).update(policy).digest("base64");

    ctx.body = {
        code: 200,
        data: {
            signature,
            policy,
            'host': config.host,
            'OSSAccessKeyId': config.accessKeyId,
            'key': expireTime,
            'success_action_status': 200,
            'dirPath': config.dirPath,
        },
        mess: '请求成功'
    }
})

module.exports = router;