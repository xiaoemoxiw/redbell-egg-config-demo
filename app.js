/** @Author : YuXueWen
 * @File : request.js
 * @Email : 8586826@qq.com
 **/

'use strict';

class AppBootHook {


  constructor(app) {
    this.app = app;
  }

  async configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

    // console.log('----configWillLoad---');
    // const { app } = this;
    //
    // app.config.oss.myConfig = 'setInApp';

    const ACMClient = require('acm-client').ACMClient;


    const endpoint = 'acm.aliyun.com';
    const namespace = '28734498-d9c8-48c2-b842-bbde454a49d0';
    const accessKey = 'LTAI4FivF5XqQDGyZB6bbFe5';
    const secretKey = 'dg7CwWIsWYHE1K85c3KTkoTpD2m0Ed';
    const requestTimeout = 6000;

    const acmClient = new ACMClient({ endpoint, namespace, accessKey, secretKey, requestTimeout });

    const dataId = 'dev-egg-master';
    const group = 'DEFAULT_GROUP';

    const acmConfig = await acmClient.getConfig(dataId, group);

    await acmClient.close();

    console.log('-configWillLoad-acmConfig--', acmConfig);


  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    console.log('----didLoad---');
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    console.log('----willReady---');
  }

  async didReady() {
    // 应用已经启动完毕
    console.log('----didReady---');
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    console.log('----serverDidReady---');
  }
}

module.exports = AppBootHook;
