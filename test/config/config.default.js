/* eslint valid-jsdoc: "off" */

'use strict';
const path=require('path')
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
  config.keys = appInfo.name + '_1590803892812_3112';

  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    cache: false,
    mapping: {
      'html': 'nunjucks'
    },
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks'
  }
  config.static={
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    // support lazy load
    // dynamic: true,
    // preload: false,
    // buffer: false,
    // maxFiles: 1000,
    // maxAge: 31536000,
  }

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
