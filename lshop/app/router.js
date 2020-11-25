'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  //前端页面
  require('./router/front')(app);
  //后台系统
  require('./router/admin')(app);
  //api接口
  require('./router/api')(app);
};
