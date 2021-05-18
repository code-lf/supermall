import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "./components/common/toast";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";
Vue.use(toast)
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/placeholder.png')
})
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
//300ms延迟
FastClick.attach(document.body)
