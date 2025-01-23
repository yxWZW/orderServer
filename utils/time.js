const getNowMilliSecond = () => {  // 获取当前时间戳
	return Math.floor(Date.now());
}

const timeStampsToStrTime = (nTimeStamps) => { // 时间戳转字符时间
    let date = new Date(nTimeStamps);
    let timeString = date.getFullYear() + "-" +
        (date.getMonth() + 1) + "-" +
        date.getDate() + " " +
        date.getHours() + ":" +
        date.getMinutes() + ":" +
        date.getSeconds() + ":" +
        date.getMilliseconds();
    return timeString;
}


module.exports = {
    getNowMilliSecond,
    timeStampsToStrTime
}
