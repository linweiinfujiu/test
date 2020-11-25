const moment = require('moment');
module.exports = {
    /**
     * 根据时间生成时间戳
     * @param {*} date 时间,
     */
    timest(time = new Date()) {

        let tmp = Date.parse(time).toString();
        tmp = tmp.substr(0, 10);
        return tmp;
    },
    /**
     * 把时间戳转化为时间
     * @param {*} time 时间戳
     */
    changeTime(time){
        return moment(time * 1000).format('YYYY-MM-DD HH:mm:ss');
    }
}