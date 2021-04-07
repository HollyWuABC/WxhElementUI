
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false

// 引入我们的组件库
import WxhElementUI from './packages/index'
Vue.use(WxhElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')