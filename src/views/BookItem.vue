<template>
  <div>
    <div class="sidebar">
      <router-link to="/Home">
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
      </router-link>
    </div>


    <div class="shoppingItem">
      <div class="item_left title">
        <img v-image-preview :src="require('@/assets/pics/'+item.isbn+'.jpg')" alt="item" class="item_img"/>
      </div>
      <div class="item_right">
        <h1>{{item.title}}</h1>
        <p>
          <label>简介： </label>
          <span class="content">{{item.content| ellipsis}}</span>
        </p>
        <div>
          <label>原价：</label>
          <span class="desc">{{item.priced}}</span><!-- 点击改变尺寸 -->
        </div>
        <div>
          <label>定价：</label>
          <span class="desc" >{{item.price}}</span>
        </div>
        <div>
          <label>作者：</label>
          <span class="desc">{{item.author}}</span><!-- 点击改变尺寸 -->
        </div>
        <div>
          <label>出版社：</label>
          <span class="desc" >{{item.publisher}}</span>
        </div>
        <div>
          <label>数量：</label>
          <span class="subtract" @click="changeNumSub" :class="{disabled:item.num<=1}">-</span>
          <input type="text" class="input_num" :value="item.num" disabled/>
          <span class="add" @click="changeNumAdd" :class="{disabled:item.num>=8}">+</span>
        </div>

      <div class="addToCart">
        <span class="addToCart_btn" @click="addToCart" v-if="true"><router-link to="/cart">加入购物车</router-link></span>
        <p class="addToCart_layout" v-if="false">加入购物车</p>
      </div>
    </div>
  </div>

    <div class="container">
      <Add :addComment="addComment"/>
      <List :comments="comments" :deleteComment="deleteComment"/>
    </div>


  </div>
</template>
<script type="text/javascript">
  import Add from '@/views/Message_board/Add.vue'
  import List from '@/views/Message_board/List.vue'
  import Qs from 'qs'
  export default {

    data() {
      return {
        item: {
          picture: '',
          title: '',
          shopsSrc: '',
          category: '',
          price: 38.70,
          content: '',
          author: '',
          isbn: '',
          flag: false,
          publisher: '',
          priced: "",
          completed: false
        },
        categories: [],
        comments: [ ]
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({name: '/Home'})
      },
      handleCurrentChange(val) {
        this.currentPage = val
        //console.log(this.ncategory)
        if (this.ncategory == "全部") {

          this.getAllBook(chedata)

        } else this.getBookInfobyCategory(this.currentPage)
      },
      addComment (comment) {
        var _this = this
        var selected_isbn = this.$route.query.a
        this.$http({ method: 'post',url: '/api/books/'+selected_isbn+'/comments',
          data: {
            name:comment.name,
            comment:comment.content
        }
        })
          .then(function (response) {
            _this.$http.get('/api/books/'+selected_isbn+'/comments', {
            })
              .then(function (response) {

                _this.comments = response.data.data.comments
                console.log("response",_this.comments )
              })
          })
          .catch(function (error)
          {
            console.log(error);
          });


      },
      //删除指定下标的评论
      deleteComment (index) {
        this.comments.splice(index, 1)
      },
      changeNumSub(){
        if(this.item.num>1){
          this.item.num -=1

        }
      },
      changeNumAdd(){
        if(this.item.num<8){
          this.item.num +=1
          console.log("hah",this.item.num)
        }
        console.log("chengong",this.item.num)
      },
      addToCart()
      {
        let chedata = {book_id:this.item.isbn, quantity:this.item.num}
        this.$http({ method: 'post',url: '/api/addCarts',data:Qs.stringify(chedata)})
          .then(function (response) {
            console.log("response",response )
          })
          .catch(function (error)
          {
            console.log(error);
          });
      }
    },
    computed: {


    },
    created() {
      var _this = this
      var selected_isbn = this.$route.query.a
      console.log("print computed666", this.$route.query);
      this.$http.get('/api/getBook/'+selected_isbn, {
      })
        .then(function (response) {
          console.log("print computed", response);
          _this.item = response.data
          _this.$set(_this.item,'num',1)
        })
      const owner = this
      this.$http({method: 'get', url: '/api/categories'})
        .then(function (response) {
          //owner.categories=response["data"]
          owner.categories.push("返回首页")
          for (var o in response["data"]) {


          }
          owner.ncategory = owner.categories[0];

        })
        .catch(function (error) {
          console.log(error);
        }),
        this.$http.get('/api/books/'+selected_isbn+'/comments', {
        })
          .then(function (response) {

            _this.comments = response.data.data.comments
            console.log("response",_this.comments )
          })

    },
    filters: {
      ellipsis(value) {
        if (!value) return ''
        if (value.length > 250) {
          return value.slice(0, 250) + '...'
        }
        return value
      }
    },
    components: {
      Add,
      List
    }
  }
</script>
<style>
  .shoppingItem{width: 900px;min-height: 450px;margin: 20px auto;padding-bottom:40px;
    border:0px solid #E4E4E4;box-shadow:0px 0px 3px 3px #E4E4E4}

  .shoppingItem:after{clear: both;content:"";display: block;width: 0;height: 0;}
  .item_left{float:left;width: 400px;padding-top:80px}
  .item_img{height: 350px;max-width: 350px;}
  .item_right{float:right;width: 480px;padding-right:20px;}
  .item_right h1{font-size: 20px;font-weight: bold;margin-bottom: 10px;line-height: 22px}
  label{display: inline-block;color:#111;font-size: 16px;padding-right: 20px;line-height: 16px;vertical-align: top;}
  .item_right div{margin: 20px 0;height: 30px;border-top:1px solid #9fd3c7;padding-top:15px;}
  .item_right .desc{font-size:15px;font-weight: 400;color:#666;display: inline-block;width: 370px;word-break: break-all;}
  .item_right .content{font-size:13px;font-weight: 400;color:#666;display: inline-block;width: 370px;word-break: break-all;}
  .item_right .size{cursor: pointer;margin-right: 5px;display: inline-block;width: 40px;text-align: center;box-sizing: border-box;height: 24px;line-height: 20px;font-size: 16px}
  .item_right .size:hover{border: 1px solid #9fd3c7;}
  .item_right .isselected{border: 1px solid #9fd3c7;}
  .subtract{display: inline-block;height: 25px;width: 25px;line-height: 25px;text-align: center;background: #ccc;cursor: pointer;font-weight: bold;font-size: 20px;color: black}
  .add{display: inline-block;height: 25px;width: 25px;line-height: 25px;text-align: center;background: #ccc;cursor: pointer;font-weight: bold;font-size: 20px;color:black;}
  .input_num{display: inline-block;width: 25px;height: 22px;vertical-align: top;}
  .addToCart_btn{display: inline-block;}
  .addToCart{}
  .addToCart_btn a{ display: inline-block;height: 50px;line-height: 50px;width: 150px;text-align: center;font-size:20px;background:  #9fd3c7;border-radius: 5px;cursor: pointer;color:#385170;text-decoration:none;}
  .addToCart_layout{width: 150px;height: 50px;z-index: 10;top:20px;color:#fff; cursor: not-allowed;background: #ededed;text-align: center;line-height: 50px;border-radius: 5px;}
  .sidebar{
    height: 100%;
    width: 210px;
    top: 0;
    position: fixed;
    background-el-color: darkslategray;
  }
  .container{margin-top: 40px}
  .basic-grey {
    margin-left:auto;
    margin-right:auto;
    max-width: 500px;
    background: #F7F7F7;
    padding: 25px 15px 25px 10px;
    font: 12px Georgia, "Times New Roman", Times, serif;
    color: #888;
    text-shadow: 1px 1px 1px #FFF;
    border:1px solid #E4E4E4;
  }



</style>
