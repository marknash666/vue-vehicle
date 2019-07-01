import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Home from '@/views/Home'
import newPersonInfo from '@/views/PersonInfo/newPersonInfo'
import UpdatePassword from '@/views/PersonInfo/UpdatePassword'
import Shop from '@/views/Shop'
import Query from '@/views/Query'
import QueryResult from '@/views/QueryResult'
import Cart_new from '@/views/Cart_new'
import BookItem from '@/views/BookItem'
import seeInfo from '@/views/PersonInfo/seeInfo'
import editInfo from '@/views/PersonInfo/editInfo'
import AppHeader from "@/views/AppHeader"
Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      component:  Query
    },
    {
      path: '/QueryResult',
      components: {
        header: AppHeader,
        default: QueryResult
      }
    },
    {
      path: '/Home',
 
      component: Home
    },
    {
      path: '/Cart',
      component: Cart_new
    },
    {
      path: '/Shop',
      component: Shop
    },
    {
      path: '/BookItem',

      component: BookItem
    },
    {
      path: '/PersonInfo/seeInfo',

      component: seeInfo
    },
    {
      path: '/PersonInfo/editInfo',

      component: editInfo
    },
    {
      path: '/Register/newPersonInfo',
  
      component: newPersonInfo
    },
    {
      path: '/PersonInfo/UpdatePassword',
      component:  UpdatePassword
    }   
  ],
  mode: 'history'
})

