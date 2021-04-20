import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false

// 引入我们的组件库
import WxhElementUI from './packages/index'
Vue.use(WxhElementUI);

new Vue({
    render: h => h(App),
}).$mount('#app')

// 设计组件时，需要考虑用户需要哪些功能，你需要暴露给用户的有哪些功能，
// 然后再考虑用户的行为