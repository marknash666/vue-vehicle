<template>
     <div>
    <div class="sidebar">
    <el-menu
      default-active="1"
      @select="handleSelect"
      class="el-menu-vertical-demo"
      background-el-color="#545c64"
      text-el-color="#fff"
      active-text-el-color="#ffd04b">
    <li v-for="category in categories">
      <el-menu-item :index=category>
        <span slot="title">{{category}}</span>
      </el-menu-item>
    </li>
    </el-menu>
</div>
 <!--i class="el-icon-location"></i-->
<div class="main-content">
  <div class="test">
    <el-row><el-col :offset="14">
<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelectMenu">
 <el-menu-item index="order"> <i class="el-icon-notebook-2"></i>订单</el-menu-item>
<el-menu-item index="cart"> <i class="el-icon-shopping-cart-1"></i>购物车</el-menu-item>
  <el-submenu index="2">
    <template slot="title"><i class="el-icon-user-solid"></i>我的</template>
    <el-menu-item index="UpdatePassword"><i class="el-icon-key">修改密码</i></el-menu-item>
    <el-submenu index="2-4">
      <template slot="title"><i class="el-icon-notebook-1">个人资料</i></template>
      <el-menu-item index="seeInfo"><i class="el-icon-view">查看</i></el-menu-item>
      <el-menu-item index="editInfo"><i class="el-icon-edit">修改</i></el-menu-item>
    </el-submenu>
     <el-menu-item index="logout"><i class="el-icon-switch-button">注销</i></el-menu-item>
  </el-submenu>
</el-menu>
</el-col>
</el-row>
  </div>
  <div class="Search">
     <el-autocomplete
  v-model="state"
  :fetch-suggestions="querySearchAsync"
  placeholder="请输入内容"
  @select="handleSelect2"
></el-autocomplete>
   </div>
  <div class="vm-image-list">
    <el-row class="image-list" :gutter="16">
      <el-col :lg="6" :sm="12" class="vm-margin" v-for="item in bookinfo" :key="item.isbn">
        <el-card :body-style="{ paddingTop: '20px',paddingBottom: '2px' }">
      <img v-image-preview :src="require('@/assets/pics/'+item.isbn+'.jpg')" class="image" alt="">
      <div style="padding: 14px;">
        <el-tooltip class="item" effect="light" :content="item.title" placement="top" >
          <span class="text">{{item.title| ellipsis }}</span>
        </el-tooltip>

        <div class="bottom clearfix">
          <router-link :to="{path:'/BookItem',query:{id:item.title,a:item.isbn}}" target="_blank">详情</router-link>
        </div>
      </div>
    </el-card>
      </el-col>
    </el-row>
    
      <!--router-view></router-view> 
      <p class="vm-author">vue-manager designed by <a href="https://github.com/luosijie" target="_blank">Jesse Luo</a></p-->
</div>

    </div>
    <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
   </div>
 
</template>

<script>
import Qs from 'qs'
  export default {
     data () {
      return {
         activeIndex: '1',
        currentPage: 1,
        ncategory:"",
        size:8,
        pageNum:10,
        bookinfo:[],
        categories:[],
        totalNum:0,
        total:0,  
         restaurants: [],
        state: '',
        timeout:  null 
      }
    },
    methods: {
     getBookInfobyCategory(currentPage)
     {
       const owner2 = this
       this.$http.get('/api/showCategory/'+owner2.ncategory, {params: {start:currentPage,size:owner2.size
    }
  })
  .then(function (response) {
   // console.log(response.data)
    owner2.bookinfo=response["data"]["list"]
   owner2.pageNum=response["data"]["pages"]
    owner2.total=owner2.pageNum*owner2.size
  })
  .catch(function (error) {
    console.log(error);
  });
  },
  getAllBook(chedata)
  {
    const owner3 = this
      this.$http({ method: 'post',url: '/api/showBook',data:Qs.stringify(chedata)})
     .then(function (response) {
        owner3.bookinfo=response.data.data
        owner3.pageNum=owner3.bookinfo.length
         owner3.total= owner3.totalNum
     })
     .catch(function (error) 
     {
       console.log(error);
     });
  },
   handleSelectMenu(key, keyPath) {
      console.info(key)
      const owner1 = this
      if(key=="logout")
      {
    this.$http({
      method: 'post',
      url: '/api/login/logout',
      data: {
      }
   }).then(function (response) {
      console.info(response)
   if(response["data"]["code"]=="100")alert("退出成功")
  //  else  alert("登陆成功")
      owner1.$router.replace('/')
  })
  .catch(function (error) {
    console.log(error);
  });
      }
      else if(key=="UpdatePassword")
      {
        owner1.$router.replace('/PersonInfo/UpdatePassword')
      }
      else if(key=="cart")
      {
 owner1.$router.replace('/Cart')
      }
      else if(key=="seeInfo")
      {
        owner1.$router.replace('/PersonInfo/seeInfo')
      }
      else if(key=="editInfo")
      {
        owner1.$router.replace('/PersonInfo/editInfo')
      }
      
      },
     handleSelect(key, keyPath){
      this.ncategory=key
    //  console.log(this.ncategory)
      this.currentPage=1
   let chedata = {size:8,start:this.currentPage}
        //console.log(this.ncategory)
        if(this.ncategory=="全部"){
          this.getAllBook(chedata)
          console.log(this.ncategory)
          }
   else this.getBookInfobyCategory(this.currentPage)
     },
      handleCurrentChange(val) {
      this.currentPage=val
        let chedata = {size:this.size,start:this.currentPage}
        //console.log(this.ncategory)
        if(this.ncategory=="全部"){
          
          this.getAllBook(chedata)
      
          }
   else this.getBookInfobyCategory(this.currentPage)
     },  querySearchAsync(queryString, cb) {
        console.info(this.restaurants)
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect2(item) {
        //console.log(item)
    this.$router.push({
      path: '/BookItem',
        query: {
          id:item.value,
          a:item.address
        }
      })
      }
     },
created(){ 
  const owner = this
   this.$http({ method: 'get', url: '/api/categories'})
   .then(function (response) {
  //owner.categories=response["data"]
  owner. categories.push("全部")
   for(var o in response["data"]){ 
    owner. categories.push(response["data"][o])
  }
  owner.ncategory= owner.categories[0];
  
   })
  .catch(function (error) {
    console.log(error);
  });
let chedata = {size:2000}
this.$http({ method: 'post',url: '/api/showBook',data:Qs.stringify(chedata)})
     .then(function (response) { 
        
        owner.totalNum=response.data.data.length
   let chedata = {size:8}
  owner.getAllBook(chedata)
  console.log(owner.bookinfo)
     })
     .catch(function (error) 
     {
       console.log(error);
     });
 this.$http({ method: 'get', url: '/api/getSearchList'})
   .then(function (response) {
     
     owner.restaurants=response.data

   })
  .catch(function (error) {
    console.log(error);
  });
  },
    filters: {
      ellipsis(value) {
        if (!value) return ''
        if (value.length > 12) {
          return value.slice(0, 12) + '..'
        }
        return value
      }
    },
  }
</script>
<style>
  .text {
    font-size: 12px;
  }
.sidebar{
    height: 100%;
    width: 210px;
    top: 0;
    position: fixed;
    background-el-color: darkslategray;
  }
   .menu{
      margin-top: 70px;
    }
    .main-content{
    position: relative;
    margin-left:  210px;
    padding: 0px 15px 15px 15px;
  }
  .vm-image-list{
    margin-top:  5px;
  }
  .vm-margin{
    margin-top:  25px;
  }
  .Search{
    margin-top:  10px;
  }
  .text{
    font-size: 17px;
  }
  .bottom{
    font-size: 15px;
  }
  .el-autocomplete
  {
    width:400px;
  }
  .el-card img{
    max-width: 250px;
    height:250px;
  }
</style>
