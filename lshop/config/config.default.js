/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583909859431_6224';
  config.salt='&%!!#)';
  //管理员登录认证码
  config.adminLoginVerifycode='123456';

 
  // add your middleware config here
  // 全局中间件
 config.middleware = [];
 config.auth = {
     noAuth:['/home/user/tologin','/','/home/user/tologin','/home/user/login','/home/user/reg',,'/home/user/toreg','/home/totest'],
     ignore:['/admin/*','/api/*']
 }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    cache: false,
    mapping: {
      'html': 'nunjucks'
    },
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks'
  }
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    // maxAge:10,
    httpOnly: true,
    encrypt: true,
  };
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'shop',
    host: '47.106.220.247',
    port: 3306,
    username: 'root',
    password: 'wuzongbo751130',
    timezone: '+08:00', // 保存为本地时区
    // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
    // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
    // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
    // more sequelize options
    define: {
      freezeTableName: true, // 阻止数据表名变为复数
      timestamps: false // 阻止model生成createAt和updateAt字段
  }
  };
  config.swaggerdoc = {
    dirScanner: './app/controller/api', // 配置自动扫描的控制器路径。
    // 接口文档的标题，描述或其它。
    apiInfo: {
      title: '双创教育中心服务接口', // 接口文档的标题。
      description: '数据接口', // 接口文档描述。
      version: '1.0.0', // 接口文档版本。
    },
    schemes: ['http', 'https'], // 配置支持的协议。
    consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html。
    produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回。
    securityDefinitions: { // 配置接口安全授权方式。
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false, // 是否启用授权，默认 false（不启用）。
    // enableValidate: true,    // 是否启用参数校验，默认 true（启用）。
    routerMap: true, // 是否启用自动生成路由，默认 true (启用)。
    enable: true, // 默认 true (启用)。
  };
  config.bizerror = {
    breakDefault: false, // disable default error handler
    sendClientAllParams: false, // return error bizParams to user
    interceptAllError: false, // handle all exception, not only bizError exception
  };

  config.cors = {
    origin:'*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  config.multipart={
    mode:'file',
    whitelist :[
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.psd',
      '.pdf',
      '.doc',
      '.docx',
      'xls',
      'xlsx',
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
  ],//上传文件的扩展名
    fileSize:'10mb',//上传文件大小
    fileExtensions:[

    ]// 自定义额外扩展
  }
  //安全
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['http://127.0.0.1:7001']
  };
  // config.validate = {
  //   // convert: false,
  //   // validateRoot: false,
  // };
  config.validatePlus = {
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.body = {
          code: 0,
          msg: errors[0].message,
        };
      }
    }
  };
  //异常处理
  config.onerror={
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error'+err;
      ctx.status = 500;
    },
  }
  config.static={
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    // support lazy load
    dynamic: true,
    preload: false,
    buffer: false,
    maxFiles: 1000,

  }
  config.minio={
    endPoint:'47.106.220.247',
    port:9000,
    useSSL:false,
    accessKey:'wuzongbo_9688@126.com',
    secretKey:'Lyw751130'
  }
  config.redis={
    client:{
      port:6379,
      host:'47.106.220.247',
      password:'!@#$%^&*(',
      db:15
    }
  }
  return {
    ...config,
    ...userConfig,
  };
};