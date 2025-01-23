
// 连接数据库
const mysql = require('mysql')
const config = require('./defaultConfig')

// 创建线程池(连接数据库的准备工作)
let pool = mysql.createPool({
    host: config.dataBase.HOST,
    user: config.dataBase.USERNAME,
    password: config.dataBase.PASSWORD,
    database: config.dataBase.DATABASE,
    port: config.dataBase.PORT
})


// 连接线程池，做sql查找
let allService = {
    query: function(sql, values){
        return new Promise((resolve, reject)=>{
            pool.getConnection(function(err, connection){  //连接数据库
                if(err){
                    reject(err)
                }else{//连接成功
                    connection.query(sql, values, (err, rows)=>{ //执行 sql
                        if(err){
                            reject(err)
                        }else{
                            resolve(rows)
                        }
                        connection.release() //释放连接
                    })
                }
            })
        })
    }
}


// 用户登录
let userLogin = function(username, password){
    let _sql = `select * from users where username="${username}" and userpwd="${password}";`
    return allService.query(_sql)
}

// 查找用户是否存在
let findUser = function(username){
    let _sql = `select * from users where username="${username}";`
    return allService.query(_sql)
}

// 根据用户 id查找用户信息
let getUser = function(id){
    let _sql = `select id,username,userimg,usersign from users where id="${id}";`
    return allService.query(_sql)
}

// 增加用户信息
let insertUser = function(value){
    let _sql = `insert into users set id=?,username=?,userpwd=?,userimg=?,usersign=?;`
    return allService.query(_sql, value)
}

// 根据类型查找对应的文章列表
let findNoteListByType = function(type){
    let _sql = `select * from note where note_type="${type}";`
    return allService.query(_sql)
}

// 添加用户的宠物信息
let addUserPet = function(value){
    let _sql = `insert into pets set petid=?,hostid=?,petname=?,petbreed=?,petage=?,petweight=?,petcolor=?,petsex=?,petcategory=?,petmessage=?,petimg=?,ctime=?;`
    return allService.query(_sql, value)
}

// 分页查询宠物信息
let toLoadPetInfo = function(value){
    // let _sql = `select petid,petname,petbreed,petage,petsex,petcategory,petimg from pets where petcategory=? limit ?,?;`
    let _sql = `select petid,hostid,petname,petbreed,petage,petsex,petcategory,petimg from pets where petcategory=? limit ?,4;`
    return allService.query(_sql, value)
}

// 根据用户 id查找用户的宠物
let findPetInfoByUserId = function(id){
    let _sql = `select * from pets where hostid="${id}";`
    return allService.query(_sql)
}

// 根据宠物 id查找用户的宠物
let findPetInfoByPetId = function(id){
    let _sql = `select * from pets where petid="${id}";`
    return allService.query(_sql)
}

// 根据用户 id修改用户的宠物
let updatePetInfoByUserId = function(value){
    let _sql = `update pets set petname=?,petbreed=?,petage=?,petweight=?,petcolor=?,petsex=?,petcategory=?,petmessage=? where hostid=? and petid=?;`
    return allService.query(_sql,value)
}

// 根据宠物 id和用户 id来删除宠物信息
let deletePetInfoByPetIdAndUserId = function(value){
    let _sql = `delete from pets where hostid=? and petid=?;`
    return allService.query(_sql,value)
}

// 根据用户 id修改用户的信息
let updateUserInfoByUserId = function(value){
    let _sql = `update users set username=?,userimg=?,usersign=? where id=?;`
    return allService.query(_sql,value)
}

// 根据宠物 id返回宠物的信息
let getPet = function(id){
    let _sql = `select * from pets where petid="${id}";`
    return allService.query(_sql)
}

// 根据用户 id查询用户的聊天列表
let getChatListById = function(id){
    let _sql = `select * from userchatlist where senderid="${id}" or receiverid="${id}";`
    return allService.query(_sql)
}

// 根据聊天列表 id查询聊天记录 (按时间从小到大排列)
let getChatByListId = function(id){
    let _sql = `select * from userchatrecord where chatlistid="${id}" order by mtime asc;`
    return allService.query(_sql)
}

// 增加聊天列表记录
let setChatListItem = function(value){
    let _sql = `insert into userchatlist set chatlistid=?,senderid=?,receiverid=?,ctime=?;`
    return allService.query(_sql, value)
}

// 增加用户聊天记录
let setChatRecord = function(value){
    let _sql = `insert into userchatrecord set chatrecordid=?,chatlistid=?,msg=?,mtime=?,receiverid=?,senderid=?;`
    return allService.query(_sql, value)
}

// 根据用户 id查询喜欢的宠物 id
let getUserFond = function(id){
    let _sql = `select petid from fond where hostid="${id}";`
    return allService.query(_sql)
}

// 通过 id查询是否为用户喜爱的宠物
let isUserFond = function(value){
    let _sql = `select id from fond where petid=? and hostid=?;`
    return allService.query(_sql, value)
}

// 删除用户喜爱的宠物
let deleteFond = function(value){
    let _sql = `delete from fond where petid=? and hostid=?;`
    return allService.query(_sql,value)
}

// 添加用户喜欢的宠物
let setFond = function(value){
    let _sql = `insert into fond set id=?,petid=?,hostid=?;`
    return allService.query(_sql, value)
}

// 增加聊天记录未读信息
let setUnreadNum = function(value){
    let _sql = `insert into unreadchat set id=?,chatlistid=?,hostid=?,unreadnum=?;`
    return allService.query(_sql, value)
}

// 修改聊天记录未读信息
let updataUnreadNum = function(value){
    let _sql = `update unreadchat set unreadnum=? where chatlistid=? and hostid=?;`
    return allService.query(_sql, value)
}

// 读取聊天列表中未读信息的数量
let getUnreadNum = function(value){
    let _sql = `select unreadnum from unreadchat where chatlistid=? and hostid=?;`
    return allService.query(_sql, value)
}

// 删除聊天列表中的未读消息
let deleteUnreadNum = function(id){
    let _sql = `delete from unreadchat where chatlistid="${id}";`
    return allService.query(_sql)
}

// 删除聊天列表
let deleteUserchatlist = function(id){
    let _sql = `delete from userchatlist where chatlistid="${id}";`
    return allService.query(_sql)
}

// 删除聊天列表对应的聊天记录
let deleteUserchatrecord = function(id){
    let _sql = `delete from userchatrecord where chatlistid="${id}";`
    return allService.query(_sql)
}

// 根据聊天记录id删除聊天记录
let deleteRecord = function(id){
    let _sql = `delete from userchatrecord where chatrecordid="${id}";`
    return allService.query(_sql)
}



module.exports = {
    userLogin,
    findUser,
    getUser,
    getPet,
    insertUser,
    findNoteListByType,
    addUserPet,
    toLoadPetInfo,
    findPetInfoByUserId,
    findPetInfoByPetId,
    updatePetInfoByUserId,
    updateUserInfoByUserId,
    deletePetInfoByPetIdAndUserId,
    getChatListById,
    getChatByListId,
    setChatListItem,
    setChatRecord,
    getUserFond,
    isUserFond,
    deleteFond,
    setFond,
    updataUnreadNum,
    getUnreadNum,
    setUnreadNum,
    deleteUnreadNum,
    deleteUserchatlist,
    deleteUserchatrecord,
    deleteRecord,
}