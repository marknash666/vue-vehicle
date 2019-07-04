import Vue from 'vue'
import Router from 'vue-router'
import AddApproved from '@/views/AddApproved'
import Query from '@/views/Query'
import QueryResult from '@/views/QueryResult'
import AppHeader from "@/views/AppHeader"
import VehicleInitial from "@/views/VehicleInitial"
import Display from "@/views/Display"
import Transfer from "@/views/Transfer";
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
    },
    {
      path: '/VehicleInitial',
      components: {
        header:AppHeader,
        default: VehicleInitial
      }
    },
    {
      path: '/Display',
      components: {
        header:AppHeader,
        default: Display
      }
    },
    {
      path: '/Transfer',
      components: {
        header:AppHeader,
        default: Transfer
      }
    }
  ],
  mode: 'history'
})

