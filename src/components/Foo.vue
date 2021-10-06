<!-- Item.vue -->
<template>
  <div>{{ foocount }}</div>
</template>

<script>
// 在这里引入模块,而非 'store/index.js' 中
// 方便在分配到该组件的chunk中,
// 由于模块现在是路由组件的依赖，所以它将被 webpack 移动到路由组件的异步 chunk 中。
import fooStoreModule from "../store/modules/foo";

export default {
  //   我们需要通过访问路由，来决定获取哪部分数据 - 这也决定了哪些组件需要渲染。
  // 事实上，给定路由所需的数据，也是在该路由上渲染组件时所需的数据。所以在路由组
  // 件中放置数据预取逻辑，是很自然的事情。

  // 我们将在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组
  // 件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：

  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    store.registerModule("foo", fooStoreModule);
    return store.dispatch("foo/inc");
  },
  destroyed() {
    // 多次访问路由时,避免客户端重复注册模块
    this.$store.unregisterModule("foo");
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    foocount() {
      return this.$store.state.foo.count;
    }
  }
};
</script>
