<template>
  <div id="login-container" v-loading="loading">
    <div class="hold-space-div"></div>
    <span id="title">汽车维修查询平台</span>
    <div style="margin: 10px;"></div>
    <el-form id="login-form" :model="QueryForm" :rules="QueryRules" ref="QueryForm" label-position="top" >
      <el-form-item  prop="vin">
        <el-input name="vin" type="text" v-model="QueryForm.vin" placeholder="车架号"
                  @keyup.enter.native="handleQuery">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button plain type="primary" style="width:40%;" :loading="loading" @click.native.prevent="handleQuery('QueryForm')" icon="el-icon-search">
          查询
        </el-button>
      </el-form-item>

    </el-form>
    <div class="hold-space-div"></div>



  </div>
</template>


<script>
  import GLOBAL from  '@/store/global_variable.js'
  export default {
    name: 'queryWidget',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsernameOrPassword(value)) {
          callback(new Error('只能输入字母和数字，且长度在 1 - 20 个字符之间'))
        } else {
          callback()
        }
      }
      return {
        QueryForm: {
          vin: ''
        },
        QueryRules: {
          vin: [
            { required: true, trigger: 'blur',message: '车架号不能为空' },
            { type: 'string', message: '车价号必须为数字和字母的组合'},
            { min: 17, max: 17, message: '车架号长度为17位', trigger: 'blur' }
            ]
        },
        loading: false,
        pwdType: 'password'

      }
    },
    computed: {

    },
    methods: {
      handleQuery(formName){
        let status = false;
        var _this = this
        var params = {
          address:GLOBAL.contract_address,
          VIN:this.QueryForm.vin
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _this.axios.get('/getExistence/',{params})
              .then(function (response) {
                console.log("print computed", response.data.existence);
                status = response.data.existence;
                if(status) {
                  _this.$router.push({path: '/QueryResult', query: {VIN: _this.QueryForm.vin}})
                }
                else
                {
                  _this.$notify({
                    title: '查询',
                    message:  '您输入的VIN不存在',
                    duration: 2500
                  });
                }
              })
          }
        })
      }
    }

  }
</script>

<style scoped>
  #login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    color: #fff;
  }
  #title {
    min-width: 580px;
    font-size: 56px;
    text-align: center;
    font-weight: bold;
  }
  #login-form {
    max-width: 350px;
    min-width: 250px;
    margin: 0 auto;
    width: 35%;
  }

  i {
    color: grey;
  }
  .hold-space-div {
    flex: 1
  }
  #elegant-sentences {
    padding-top: 25px;
    margin: 0 auto;
    max-width: 660px;
    min-width: 30%;
  }
  #elegant-sentences-content {
    width: 100%;
  }
  #elegant-sentences-inscribe {
    margin-top: 15px;
    width: 100%;
    text-align: right;
  }


</style>
