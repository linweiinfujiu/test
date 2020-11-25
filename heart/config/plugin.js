'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
 
  //orm插件
  sequelize : {
    enable: true,
    package: 'egg-sequelize'
  },
  //模板渲染插件
  nunjucks :{
    enable: true,
    package: 'egg-view-nunjucks',
  },
  //api ui插件
  swaggerdoc:{
    enable: true,   // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
  },
  //异常处理插件
  bizerror:{
    enable: true,
    package: 'egg-bizerror',
  },
  //跨域插件
  cors :{
    enable: true,
    package: 'egg-cors',
  },
  // validate : {
  //   enable: true,
  //   package: 'egg-validate',
  // },
  validatePlus :{
    enable: true,
    package: 'egg-validate-plus',
  },
  redis:{
    enable:true,
    package: 'egg-redis',
  }
};
