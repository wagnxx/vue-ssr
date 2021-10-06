const express = require('express');
const server = express();
server.use(express.static('./dist'));
const LRU = require('lru-cache');

const microCache = new LRU({
  max: 100,
  maxAge: 1000, // 重要提示：条目在 1 秒后过期。
});

const isCacheable = (req) => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定 (non-user-specific) 页面才会缓存
  return req.url !== '/' && req.url !== '';
};

const { createBundleRenderer } = require('vue-server-renderer');
const template = require('fs').readFileSync(
  './public/index.template.html',
  'utf-8'
);

const serverBundle = require('./dist/to/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/to/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template,
  clientManifest,
});

const contextMap = {
  demo: {
    title: 'vue ssr demo',
    metas: `
              <meta name="keyword" content="vue,ssr">
              <meta name="description" content="vue srr demo">
          `,
  },
  default: {
    title: 'vue ssr default',
    metas: `
              <meta name="keyword" content="vue,ssr">
              <meta name="description" content="vue srr default">
          `,
  },
};

server.use('/api', require('./backend/routes/index'));

server.get('*', (req, res) => {
  let contextRaw =
    req.url.indexOf('/demo') > -1 ? contextMap.demo : contextMap.default;
  let context = { url: req.url, ...contextRaw };
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！

  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      return res.end(hit);
    }
  }

  renderer
    .renderToString(context)
    .then((html) => {
      res.end(html);
      if (cacheable) {
        microCache.set(req.url, html);
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

server.listen(8001);
