<template>
  <div>
  <div class="cart" >
  <el-table
    :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    ref="multipleTable"
    :data="cart.slice((currentPage-1)*pagesize,currentPage*pagesize)"
    :summary-method="getSummaries"
    :row-key="getRowKeys"
    show-summary
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      :reserve-selection="true"
      width="55">
    </el-table-column>
    <el-table-column
      label="书籍"
      width="330px"
      show-overflow-tooltip
      content="{{}}">
      <template slot-scope="scope">
        <div class="book_info">
        <img v-image-preview :src="require('@/assets/pics/'+scope.row.isbn+'.jpg')" alt="single" height="80px"/><p>{{scope.row.title | ellipsis}}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column
      prop="category"
      label="书籍类别"
      width="120">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="170"
      show-overflow-tooltip>
    </el-table-column>

    <el-table-column
      label="数量"
      width="200">
      <template slot-scope="scope">
        <div class="Number">
          <el-button size="small" class="inline_div" @click="changeNumSub(scope.$index)" :class="{disabled:scope.row.num<=1}">-</el-button>
          <input type="text" class="inline_div" :value="scope.row.num" disabled/>
          <el-button size="small" class="inline_div" @click="changeNumAdd(scope.$index)" :class="{disabled:scope.row.num>=8}">+</el-button>
        </div>
      </template>
    </el-table-column>

    <el-table-column
      label="金额"
      width="120">
      <template slot-scope="scope">
        <div class="Number">
          <span >￥{{parseFloat(scope.row.num*scope.row.price).toFixed(2)}}</span>
        </div>
      </template>
    </el-table-column>



  </el-table>




  </div>

  <div class="block">
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pagesize"
      :current-page="currentPage"
      @current-change="current_change">
    </el-pagination>
  </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        cart: [],
        multipleSelectionALL: [],
        multipleSelection: [],
        total: 10,
        pagesize:5,
        currentPage:1,
        sum: "0.00"
      }
    },
    computed: {
      pricedSum(){
        var cur_sum='0.00'
        var _this=this
        var floatMul = function (m, n, sum) {
          var _m = m.split('.')
          var _n = n.split('.')
          var maxFloatNum = Math.max(parseInt(_m[1].length), parseInt(_n[1].length))
          console.log(maxFloatNum)
          var multiple = (parseFloat(m) * Math.pow(10, maxFloatNum) + parseFloat(n) * Math.pow(10, maxFloatNum)) / Math.pow(10, maxFloatNum)
          return multiple.toFixed(sum)
        }
        let qiantao = function (target)
        {
          target.forEach(content => {
            cur_sum = floatMul(cur_sum, parseFloat(content.num * content.price).toFixed(2), 2)
            console.log("spdpa",cur_sum)
          });

        }

        if(!_this.multipleSelection)
          return

        this.multipleSelectionALL.forEach((target, index) => {
          qiantao(target)      }
        )
        return cur_sum
      }

    },
    methods: {
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      getRowKeys(row) {
        return row.isbn;
      }
      ,
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.multipleSelectionALL[this.currentPage-1]=val;


      },
      changeNumSub(index) {
        var true_index=index+this.currentPage*this.pagesize-this.pagesize
        if (this.cart[true_index].num > 1) {
          this.cart[true_index].num -= 1

        }

      },
      changeNumAdd(index) {
        var true_index=index+this.currentPage*this.pagesize-this.pagesize
        if (this.cart[true_index].num < 8) {
          this.cart[true_index].num += 1
          console.log("prien",this.cart[true_index].num)
        }

      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];

        columns.forEach((column, index) => {
          if (index === 1) {
            sums[index] = '总额';
            return;
          }
          const values = data.map(item => Number(item[column.property]));


          if (!values.every(value => isNaN(value))) {

            sums[index] =this.pricedSum;
          } else {
            sums[index] = '';
          }
        });

        return sums;
      },
    },
    filters: {
      ellipsis(value) {
        if (!value) return ''
        if (value.length > 13) {
          return value.slice(0, 13) + '..'
        }
        return value
      }
    },
    mounted: function()
    {

    },
    created()
    {
      var _this=this
      console.log("12121212", _this.cart);
      this.$http({ method: 'post',url: '/api/getCarts'})
        .then(function (response) {
          console.log("response", response)
          response.data.forEach((content, index) => {
            _this.$http({ method: 'get',url: '/api/getBook/'+content.book_id})
              .then(function (res) {
                console.log("print computed", index);
                _this.$set(res.data, 'num', content.quantity)
                _this.$set(_this.cart,index,  res.data)
                console.log("12121212", _this.cart);
                _this.total=_this.cart.length;

              })
          })
        })

    }
  }
</script>
<style>

  .cart{margin: 20px auto;display:inline-block;}
  .book_info img{width: 80px;height: 80px;}
  .book_info p{display: inline-block;font-size: 14px;overflow: hidden;
      color: #3c3c3c;;vertical-align:middle;margin-left: 5px;cursor: pointer;}
  .Number input{width:30px}
  .Number .inline_div{display: inline}


</style>
