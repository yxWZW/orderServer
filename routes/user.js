const router = require('koa-router')();
const userService = require('../controllers/mySqlConfig');
const { v1: uuidv1 } = require('uuid');
const jwt = require('../utils/jwt.js');
const auth = require('../middleware/auth.js');

router.prefix('/user');  //公共前缀

// 登录接口
router.post('/login', async (ctx, next)=>{
    // 拿到前端的参数
    let _username = ctx.request.body.username;
    let _password = ctx.request.body.password;

    // 去数据库里匹配数据
    await userService.userLogin(_username, _password)
    .then(res=>{
        // 向前端返回内容
        if(res.length){
            let result = {
                id: res[0].id,
                username: res[0].username
            }
            let token = jwt.generate(result, '1d')
            ctx.body = {
                code: 200,
                data: {
                    id: res[0].id,
                    name: res[0].username,
                    userImg: res[0].userimg,
                    sign: res[0].usersign,
                    token
                },
                mess: '登录成功'
            }
        }else{
            ctx.body = {
                code: 406,
                data: 'error',
                mess: '账号、密码有误或用户不存在'
            }
        }
    }).catch(err=>{
        ctx.body = {
            code: 407,
            data: err,
            mess: '服务器出错'
        }
    })
});

// 注册
router.post('/register', async (ctx, next)=>{
    let userId = uuidv1();
    let _username = ctx.request.body.username;
    let _password = ctx.request.body.password;
    let _userimg = ctx.request.body.userimg;
    let _usersign = ctx.request.body.usersign;

    console.log(_username, _password);

    if(!_username || !_password){
        ctx.body = {
            code: '406',
            mess: '用户名和密码不能为空'
        }
        return 
    }

    // 判断数据库中有没有这个username
    await userService.findUser(_username).then(async (res)=>{
        if(res.length){
            ctx.body={
                code: '407',
                mess: '账号已存在'
            }
        }else{
            await userService.insertUser([userId, _username, _password, _userimg, _usersign]).then(res=>{
                if(res.affectedRows){
                    ctx.body={
                        code: 200,
                        data: 'ok',
                        mess: '注册成功'
                    }
                }else{
                    ctx.body={
                        code: '406',
                        data: 'error',
                        mess: '注册失败'
                    }
                }
            })
        }
    })

});

// 返回用户信息
router.post('/getUser', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;

    await userService.getUser(_userid).then(res => {
        ctx.body = {
            code: 200,
            data: {
                id: res[0].id,
                name: res[0].username,
                userImg: res[0].userimg,
                sign: res[0].usersign
            },
            mess: '请求成功'
        }
    }).catch(err=>{
        ctx.body = {
            code: '406',
            data: err,
            mess: '请求失败'
        }
    })
});

// 修改用户信息
router.post('/updataUser', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;

    let _username = ctx.request.body.name;
    let _userimg = ctx.request.body.userImg;
    let _usersign = ctx.request.body.sign;

    await userService.updateUserInfoByUserId([_username,_userimg,_usersign,_userid]).then(res => {
        if(res.affectedRows){
            ctx.body={
                code: 200,
                data: 'ok',
                mess: '修改成功'
            }
        }else{
            ctx.body={
                code: '406',
                data: 'error',
                mess: '修改失败'
            }
        }
    })
});

// 返回用户主页
router.post('/userSpace', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.request.body.userId;
    let _userinfo = null;
    let _petinfo = null;
    let petlist = null;
    let _fondinfo = [];
    
    
    await userService.getUser(_userid).then(res => {
        _userinfo = res[0];
    });

    await userService.findPetInfoByUserId(_userid).then(res => {
        _petinfo = res.map(item => {
            return {
                petid: item.petid,
                hostid: item.hostid,
                petimg: item.petimg,
            };
        });
    });

    await userService.getUserFond(_userid).then(async res => {
        petlist = res.map(item => { return item.petid; });
    })

    const promiseList = await petlist.map(async item => {
        await userService.findPetInfoByPetId(item).then(res => {
            _fondinfo.push({
                petid: res[0].petid,
                hostid: res[0].hostid,
                petimg: res[0].petimg,
            });
        });
    });

    await Promise.all(promiseList).then(res => {
        if(_userinfo !== null && _petinfo !== null && _fondinfo !== null){
            ctx.body = {
                code: 200,
                data: {
                    userInfo: _userinfo,
                    petInfo: _petinfo,
                    fondinfo: _fondinfo
                },
                mess: '请求成功'
            };
        }else{
            ctx.body = {
                code: '406',
                data: new Error(),
                mess: '请求失败'
            };
        };
    })
});

// 返回用户对应聊天记录
router.post('/chatRecord', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;
    let _listid = ctx.request.body.listId;
    let _chatid = ctx.request.body.chatId;
    
    if(_listid){
        /* 将获取的聊天列表中的未读信息归零 */
        userService.updataUnreadNum([0, _listid, _userid]);
        // 当聊天列表 -- 已经存在
        await userService.getChatByListId(_listid).then(res => {
            ctx.body = {
                code: 200,
                data: {list: res, listid: _listid},
                mess: '请求成功'
            }
        }).catch(err=>{
            ctx.body = {
                code: '406',
                data: err,
                mess: '请求失败'
            }
        })
    }else{
        // 当聊天列表 --不存在
        let _chatlistid = uuidv1();
        let _time = `${new Date().getTime()}`;
        await userService.setChatListItem([_chatlistid, _userid, _chatid, _time]).then(async res => {
            if(res.affectedRows){
                const idlist = [_userid, _chatid];
                idlist.forEach(async (item, index) => {
                    let id = uuidv1() + index;
                    await userService.setUnreadNum([id, _chatlistid, item, 0]);
                })
                ctx.body={
                    code: 200,
                    data: {list: [], listid: _chatlistid},
                    mess: '添加成功'
                }
            }else{
                ctx.body={
                    code: '406',
                    data: 'error',
                    mess: '添加失败'
                }
            }
        })

    }
});

// 返回用户的喜爱宠物
router.post('/fond', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;

    let petlist = [];
    let fondlist = [];
    await userService.getUserFond(_userid).then(res => {
        petlist = res.map(item => { return item.petid; });
    });

    const promiseList = await petlist.map(async item => {
        await userService.findPetInfoByPetId(item).then(res => {
            fondlist.push(res[0]);
        });
    });

    await Promise.all(promiseList).then(res => {
        ctx.body = {
            code: 200,
            data: fondlist,
            mess: '请求成功'
        }
    }).catch(err=>{
        ctx.body = {
            code: '406',
            data: err,
            mess: '请求失败'
        }
    })
})

// 修改用户的喜爱宠物状态
router.post('/setCollect', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;
    let _petid = ctx.request.body.id;

    await userService.isUserFond([_petid, _userid]).then(async res => {
        if(res.length !== 0){
            await userService.deleteFond([_petid, _userid]).then(res => {
                if(res.affectedRows){
                    ctx.body = {
                        code: 200,
                        data: false,
                        mess: '删除成功'
                    }
                }
            });
        }else {
            const _id = uuidv1();
            await userService.setFond([_id, _petid, _userid]).then(res => {
                if(res.affectedRows){
                    ctx.body = {
                        code: 200,
                        data: true,
                        mess: '添加成功'
                    }
                }
            })
        }
    })

});

// 返回用户宠物的喜爱状态
router.post('/getCollect', async (ctx, next)=>{
    await auth.Auth(ctx, next);
    let _userid = ctx.state.user.id;
    let _petid = ctx.request.body.id;

    await userService.isUserFond([_petid, _userid]).then(async res => {
        ctx.body = {
            code: 200,
            data: res.length !== 0,
            mess: '查询成功'
        }
    })

});

// 修改用户未读信息数量
router.post('/updataUnreadnum', async (ctx, next)=>{
    let _listid = ctx.request.body.listid;
    let _userid = ctx.request.body.userid;

    await userService.updataUnreadNum([0, _listid, _userid]).then(res => {
        ctx.body = {
            code: 200,
            data: '',
            mess: '清除成功'
        }
    })
});

// 删除聊天列表
router.post('/deleteChatList', async (ctx, next)=>{
    let _listid = ctx.request.body.id;

    const unreadnumPromise =  await userService.deleteUnreadNum(_listid);
    const userchatlistPromise =  await userService.deleteUserchatlist(_listid);
    const userchatrecordPromise = await userService.deleteUserchatrecord(_listid);

    await Promise.all([unreadnumPromise, userchatlistPromise, userchatrecordPromise]).then(res => [
        ctx.body = {
            code: 200,
            data: '',
            mess: '删除成功'
        }
    ])
})

// 删除聊天记录
router.post('/deleteRecord', async (ctx, next)=>{
    let _recordid = ctx.request.body.id;
    await userService.deleteRecord(_recordid).then(res => {
        if(res.affectedRows){
            ctx.body = {
                code: 200,
                data: '',
                mess: '删除成功'
            }
        }else{
            ctx.body = {
                code: 406,
                data: '',
                mess: '删除失败'
            }
        }
    })
})

module.exports = router;