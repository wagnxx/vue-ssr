import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store/store';
import { sync } from 'vuex-router-sync';

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.use(ViewUI);

export function createApp() {
  const router = createRouter();
  const store = createStore();

  sync(store, router);
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  });

  return { app, router, store };
}
