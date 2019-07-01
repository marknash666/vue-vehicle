<template>
  <div id="login-container" v-loading="loading">
    <div class="hold-space-div"></div>
    <gd id="title">汽车维修查询平台</gd>
    <div style="margin: 10px;"></div>
    <el-form id="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="top" >
      <el-form-item  prop="vin">
        <el-input name="vin" type="text" v-model.number="loginForm.vin" placeholder="车架号"
                  @keyup.enter.native="handleQuery">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:40%;" :loading="loading" @click.native.prevent="handleQuery">
          登录
        </el-button>
      </el-form-item>

    </el-form>
    <div class="hold-space-div"></div>
    <div v-if="elegantSentences" id="elegant-sentences">
      <div id="elegant-sentences-content">
        {{elegantSentences.content}}
      </div>
      <div id="elegant-sentences-inscribe">
        —— {{elegantSentences.name}}
      </div>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'loginWidget',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsernameOrPassword(value)) {
          callback(new Error('只能输入字母和数字，且长度在 1 - 20 个字符之间'))
        } else {
          callback()
        }
      }
      return {
        elegantSentences: null,
        commDelay: '待获取',
        dataBeforeTime: 0,
        IsNormal: '待获取',
        loginForm: {
          vin: '',
          password: ''
        },
        loginRules: {
          vin: [
            { required: true, trigger: 'blur',message: '车架号不能为空' },
            { type: 'number', message: '车价号必须为数字'}]
        },
        loading: false,
        pwdType: 'password'
      }
    },
    computed: {

    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleQuery() {
        this.$router.push({path: '/QueryResult', query: {VIN: this.loginForm.vin}})
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
    z-index: 100;
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
    width: 25%;
  }

  i {
    color: grey;
  }
  .hold-space-div {
    flex: 1
  }
   gd{
    font-size: 100px;
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
