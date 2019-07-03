import Vue from 'vue'
import Router from 'vue-router'
import AddApproved from '@/views/AddApproved'
import Query from '@/views/Query'
import QueryResult from '@/views/QueryResult'
import AppHeader from "@/views/AppHeader"
Vue.use(Router)

export default new Router({
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      components: {
        header: AppHeader,
        default: Query
      }
    },
    {
      path: '/QueryResult',
      components: {
        header:AppHeader,
        default: QueryResult
      }
    },
    {
      path: '/AddApproved',
      components: {
        header:AppHeader,
        default: AddApproved
      }
    }
  ],
  mode: 'history'
})

