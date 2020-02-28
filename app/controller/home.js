'use strict';

const Controller = require('egg').Controller;
const dateFormat = require('dateformat');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async upload() {
    const ctx = this.ctx;
    const parts = ctx.multipart();
    let part;
    const s_body = new Set();
    while ((part = await parts()) != null) {
      if (!part.filename) {
        return;
      }
      const now = new Date();
      const upload_path = dateFormat(now, 'yyyy/mm/dd/');
      const result = await ctx.oss.put(upload_path + part.filename, part);
      s_body.add(result);
    }

    if (s_body.size === 1) {
      ctx.body = [ ...s_body ][0];
    } else if (s_body.size > 1) {
      ctx.body = [ ...s_body ];
    } else {
      ctx.body = 'no data';
    }
  }

  async acm() {
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


    console.log('---acmConfig---', acmConfig);
  }

  getConfig() {
    const { config } = this;
    console.log('--myConfig--', config.oss.myConfig);
    console.log('--myConfig2--', config.oss.myConfig2);
  }

}

module.exports = HomeController;
