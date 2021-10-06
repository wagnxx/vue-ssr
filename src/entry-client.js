import { createApp } from './app';
// 客户端特定的引导逻辑
const { app, router, store } = createApp();

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const mathed = router.getMatchedComponents(to);
    const prevMathed = router.getMatchedComponents(from);
    let diffed = false;
    const activated = mathed.filter((c, i) => {
      return diffed || (diffed = prevMathed[i] !== c);
    });
    if (!activated.length) {
      return next();
    }
    // 这里如果有加载指示器,就触发

    Promise.all(
      activated.map((c) => {
        if (c.asyncData) {
          return c.asyncData({ store, route: to });
        }
      })
    )
      .then(() => {
        // 停止加载指示器
        next();
      })
      .catch(next);
  });
  // app.$mount('#app');
  app.$mount('#app', true)
});
