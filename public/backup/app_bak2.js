const Vue = require('vue');
const server = require('express')();
// create renderer

const template = require('fs').readFileSync(
  './public/index.template.html',
  'utf-8'
);

const renderer = require('vue-server-renderer').createRenderer({
  template,
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

{
  // 将vue实例化渲染为 HTML
  // renderer.renderToString(app,(err,html) => {
  //     if(err) throw err;
  //     console.log(html);
  //     //
  // })
  // 2.5.0+
  // renderer
  //   .renderToString(app)
  //   .then((html) => {
  //     console.log(html);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
}

server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: '<div>访问的地址是:{{ url }}</div>',
  });

  context =
    req.url.indexOf('/demo') > -1 ? contextMap.demo : contextMap.default;

  renderer
    .renderToString(app, context)
    .then((html) => {
      res.end(html);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end('Internal Server Error !!!');
      return;
    });
});

server.listen(8000);
