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
//import './styles/bootstrap.min.css'
import Argon from '@/plugins/argon-kit'
Vue.use(Argon);
Vue.use(VueDirectiveImagePreviewer)
//axios.defaults.baseURL='http://localhost:8080';
Vue.prototype.$ajax=axios
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI, {locale})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
   store,
  components: { App },
  template: '<App/>'
})
