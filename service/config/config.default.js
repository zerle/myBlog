/* eslint valid-jsdoc: "off" */

'use strict';

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
  config.keys = appInfo.name + '_1602908952448_942';

  // add your middleware config here
  config.middleware = [];
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      // password: 'root',
      password: '12345678',
      database: 'blog',
    },
    app: true,
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    // domainWhiteList: [ 'http://47.97.64.112:3000', 'http://47.97.64.112' ],
    domainWhiteList: [ 'http://localhost:3000' ],
  };
  config.cors = {
    // origin: 'http://localhost:3000',
    credentials: true, // 允许Cook可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
