'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.home.upload);
  router.get('/acm', controller.home.acm);
  router.get('/getConfig', controller.home.getConfig);
};
