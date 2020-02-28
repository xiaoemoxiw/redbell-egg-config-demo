'use strict';

exports.cluster = {
  listen: {
    port: 9100,
    hostname: '127.0.0.1',
  },
};

exports.oss = {
  client: {
    accessKeyId: process.env.oss_key,
    accessKeySecret: process.env.oss_secret,
    bucket: 'redbellnet-demo',
    endpoint: 'oss-cn-shenzhen.aliyuncs.com',
    timeout: '60s',
  },
};
