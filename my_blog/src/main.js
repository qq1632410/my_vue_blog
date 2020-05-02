import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import { Message }from 'element-ui';


// 解决重复点击导航路由报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
}


Vue.prototype.$message = Message;

Vue.config.productionTip = false

new Vue({
  store,
   router,
  render: h => h(App)
}).$mount('#app')

