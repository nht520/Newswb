// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入store
import Vuex from 'vuex';
import store from "./store/store";
Vue.use(Vuex);
//ui组件库
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
Vue.use(MuseUI);
//
import Vuetify from 'vuetify';
// main.styl
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify);
//接口配置
import config from "../static/config";
//安装 npm install stylus stylus-loader --save-dev
//引入全局样式
import css from "../static/css/reset.css"


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
