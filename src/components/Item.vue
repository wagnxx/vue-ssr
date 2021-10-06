<!-- Item.vue -->
<template>
  <div class="item">
    <p>

    Item-title:
    <span class="item__title">{{ item.title }}</span>
    </p>
    
    <strong>CONTENT</strong>
    <p>{{ item.content }}</p>
    <article>
      <div class="google">
        <p>PostCSS是一个非常通用的工具，它可以通过javascript插件转换CSS样式。它的灵活性在于它的建造方式。</p>
        <p>PostCSS的核心部分是一个node.js模块，您可以使用NPM进行安装，它有一个由200多个插件组成的生态系统，您可以在项目中选择使用这些插件。</p>
        <p>PostCSS既不是预处理器，也不是后处理器，因为不同的PostCSS插件可能属于这两类中的任何一类，或者同时属于这两类；它完全取决于您对它的理解。使用PostCSS，您不需要学习不同的语法，比如sass或Less；您可以立即开始使用它。</p>
        <p>PostCSS获取现有的css文件并将其转换为javascript可读数据，然后javascript插件执行修改，postss返回原始文件的修改版本。听起来很酷，不是吗？</p>
        <p>在这篇文章中，我们将查看6个Postcss插件，让您了解使用这个出色的工具可以实现的一些伟大的事情。</p>
        <p>Autoprefixer</p>
        <p>autoprefixer可能是最知名的postcss插件，因为它被谷歌、Twitter和Shopify等知名科技公司使用。它在必要的地方向CSS规则添加供应商前缀。</p>
        <p>autoprefixer使用我可以使用的数据。这样它就不会过时，而且可以应用最新的规则。您可以在它的交互式演示站点上查看它的工作原理。</p>
        <p>作者：前端岚枫</p>
        <p>链接：https://juejin.im/post/6844903808254869511</p>
        <p>来源：掘金</p>
        <p>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  //   我们需要通过访问路由，来决定获取哪部分数据 - 这也决定了哪些组件需要渲染。
  // 事实上，给定路由所需的数据，也是在该路由上渲染组件时所需的数据。所以在路由组
  // 件中放置数据预取逻辑，是很自然的事情。

  // 我们将在路由组件上暴露出一个自定义静态函数 asyncData。注意，由于此函数会在组
  // 件实例化之前调用，所以它无法访问 this。需要将 store 和路由信息作为参数传递进去：

  asyncData({ store, route }) {
    // 触发 action 后，会返回 Promise
    console.log("fetchData", store);
    return store.dispatch("fetchItem", route.params.id);
  },
  computed: {
    // 从 store 的 state 对象中的获取 item。
    item() {
      return (
        this.$store.state.items[this.$route.params.id] || { title: "未能侦探" }
      );
    }
  },
  beforeUpdate() {
    const id = this.$route.params.id;
    const itemIsFetched = this.$store.state.items[this.$route.params.id];
    if (!itemIsFetched) {
      this.$store.dispatch("fetchItem", id);
      console.log("params", this.$route.params);
      console.log("upadate", this.$store.state.items);
    }
  },
  watch: {
    // $route: {
    //   handler() {
    //     const id = this.$route.params.id;
    //     return this.$store.dispatch("fetchItem", id);
    //     //深度监听，同时也可监听到param参数变化
    //   },
    //   deep: true
    // }
  }
};
</script>

 
<style  scoped>
.item {
  border: 1px solid #ddd;
  padding: 7px;
}
.item__title {
  font-size: 16px;
  font-weight: 600;
  color: #f00;
}
</style>