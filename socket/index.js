const Koa = require('koa');
const app = new Koa();
const { v1: uuidv1 } = require('uuid');
const http = require('http');
const { Server } = require('socket.io');
const config = require('../config');
const server = http.createServer(app.callback());
const io = new Server(server, {
    allowEIO3: true,
    cors: {
        origin: config.socketUrl,
        methods: ['GET', 'POST'],
        credentials: true
    },
});
const userService = require('../controllers/mySqlConfig');

const userList = [];

io.on('connection', function (socket) {
    /* 监听用户登录事件 */
    socket.on('login', async (data, callback) => {
        var islogin = true;
        userList.forEach(iss => {
            if (iss.name == data.id){
                islogin = false;
            }
        });
        if (islogin) {
            console.log('用户登录');
            userList.push(data);
            socket.name=data.id;
            // 广播用户登录的信息
            io.sockets.send({id: data.id, islogin: true});
            callback(true);
        } else {
            console.log('用户登录失败！：', data);
            callback(false);
        }
    });

    /* 监听用户获取聊天列表 */
    socket.on('chatList', async (data, callback) => {
        const chatList = [];
        /* 获取每个聊天对象的信息 */
        const setChatList = async (userid, listItem) => {
            await userService.getUser(userid).then(async res => {
                chatList.push({
                    id: listItem.chatlistid,
                    userId: res[0].id,
                    name: res[0].username,
                    img: res[0].userimg,
                    time: listItem.ctime
                })

                await userService.getUnreadNum([listItem.chatlistid, data.id]).then(res => {
                    chatList.forEach(item => {
                        if(item.id === listItem.chatlistid){
                            item.unreadNum = res[0].unreadnum;
                        }
                    });
                });

                await userService.getChatByListId(listItem.chatlistid).then(res => {
                    chatList.forEach(item => {
                        if(item.id === listItem.chatlistid && res.length === 0){
                            item.newMsg = '';
                        }else if(item.id === listItem.chatlistid && res.length !== 0){
                            const msgInfo = res[res.length - 1];
                            item.newMsg = msgInfo.msg;
                            item.time = msgInfo.mtime;
                        }
                    })
                    
                })
            });
        };

        /* 获取聊天对象列表 */
        await userService.getChatListById(data.id).then(async res => {
            const promiseList = await res.map(async item => {
                if(item.senderid === data.id){
                    await setChatList(item.receiverid, item);
                }else {
                    await setChatList(item.senderid, item);
                }
            });

            Promise.all(promiseList).then(res => {
                if(res){
                    chatList.forEach(item => {
                        let index = userList.findIndex(i=>i.id==item.userId);
                        if(index!=-1){
                            item.islogin = true;
                        }else{
                            item.islogin = false;
                        }
                    });
                    callback(chatList);
                }
            })
        });
    });

    /* 监听用户发送消息 */
    socket.on('privateChat', async (data, callback)=> {
        const _chatrecordid = uuidv1();
        const { chatlistid, msg, mtime, receiverid, senderid } = data;
        await userService.setChatRecord([_chatrecordid, chatlistid, msg, mtime, receiverid, senderid ]).then(async res => {
            if(res.affectedRows){
                io.sockets.sockets.forEach(iss=>{
                    if(iss.name==data.receiverid){
                        io.to(iss.id).emit('updateChatMessageList',data);
                    }
                })
                await userService.getUnreadNum([chatlistid, receiverid]).then(res => {
                    let num = res[0].unreadnum + 1;
                    userService.updataUnreadNum([num, chatlistid, receiverid]);
                })
                callback({code: 200, data: _chatrecordid, mess: '发送成功'});
            }else{
                callback({code: 406, mess: '发送失败'});
            }
        })
    });

    /* 监听用户下线 */
    socket.on('disconnect',()=>{
        let index = userList.findIndex(i=>i.id === socket.name);
        if(index!=-1){
            userList.splice(index,1);
            io.sockets.send({id: socket.name, islogin: false});
        }
    });

    // 监听连接失败
    socket.on('connect_error', e => {
        console.log('connect_error', e);
    });
});

module.exports = io;