// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import VueRouter from 'vue-router'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import axios from '../node_modules/axios'
import store from './store/index'
import './icons'
import VueDirectiveImagePreviewer from 'vue-directive-image-previewer'
import 'vue-directive-image-previewer/dist/assets/style.css'
import Web3 from '@/components/Web3'
import Argon from '@/plugins/argon-kit'
Vue.use(Argon);
Vue.use(VueDirectiveImagePreviewer)

axios.defaults.baseURL='/api'

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(ElementUI, {locale})
/* eslint-disable no-new */
Vue.component('modal', {
  template: '#modal-template',
  props: {
    show: {
      type: Boolean,
      required: true, // 必需且是bool类型的
      twoWay: true   // 双向绑定
    }
  }
})

const vue = new Vue({
  el: '#app',
  router,
  axios,
   store,
  components: { App },
  template: '<App/>',
  data: {
    showModal: false
  }
}).$mount("#app")

window.addEventListener('load', function () {   // /date 表示日期选择路由
    vue.$router.replace('/') // 列表页面的路由
})
