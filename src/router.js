// router.js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    // mode: 'history',
    routes: [
      { path: '', component: () => import('@c/Home.vue') },
      { path: '/', component: () => import('@c/Home.vue') },
      { path: '/item/:id', component: () => import('@c/Item.vue') },
      { path: '/class/list', component: () => import('@views/class/list.vue') },
    ],
  });
}
