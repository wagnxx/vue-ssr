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

const context = {
  title: 'vue ssr',
  metas: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
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
    template: `<div>访问的 URL 为： {{ url }}  !</div>`,
  });

  renderer.renderToString(app, context, (err, html) => {
    console.log(html);
    if (err) {
      res.status(500).end('Internal Server Error');
      return;
    }
    res.end(html);
  });
});

server.listen(8000);
