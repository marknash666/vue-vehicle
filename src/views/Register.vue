<template>
  <div class="login-container">
      
    <el-form autoComplete="on" :model="RegisterForm" :rules="RegisterRules" ref="RegisterForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">注册新用户</h3>
  
      <el-form-item prop="username" label="用户名" label-width="80px">
        <el-input v-model="RegisterForm.username" autoComplete="on" placeholder="请输入用户名"/>
      </el-form-item>
      <el-form-item prop="pw1" label="密码" label-width="80px">
        <el-input type="password" v-model="RegisterForm.pw1" autoComplete="on" placeholder="请输入密码"/>
      </el-form-item>
      <el-form-item prop="pw2" label="确认密码" label-width="80px">
        <el-input type="password" v-model="RegisterForm.pw2" autoComplete="on" placeholder="请确认密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>
    </el-form>

  </div>
</template>



<script>
  export default {
    name: 'register',
    data() {
      return {
        RegisterForm: {
          username: '',
          pw1: '',
          pw2: ''
        },
        RegisterRules: {
          username: [{required: true, trigger: 'blur', message: "请输入用户名"}],
          pw1: [{required: true, trigger: 'blur', message: "请输入密码"}],
          pw2: [{required: true, trigger: 'blur', message: "请确认密码"}]
        },
        loading: false
      }
    },
    methods: {
      handleRegister() {
           const owner = this
        if(this.RegisterForm.username=="")alert("用户名不能为空")
       else if(this.RegisterForm.pw1=="")alert("请输入您的密码")
       else if(this.RegisterForm.pw2=="")alert("请确认您的密码")
      else if(this.RegisterForm.pw1!=this.RegisterForm.pw2)alert("两次输入的密码不一致")
      else 
      //if(this.RegisterForm.username!=""&&this.loginForm.pw1!=""&&this.loginForm.pw2!="")
    this.$http({
      method: 'post',
      url: '/api/login/register',
      data: {
        username: this.RegisterForm.username,
        password: this.RegisterForm.pw1,
      }
   }).then(function (response) {
    console.log(response); 
    if(response["data"]!="1")alert("注册失败，用户名已存在")
   else {
      alert("注册成功")
owner.$http({
      method: 'post',
      url: '/api/login/auth',
      data: {
        username: owner.RegisterForm.username,
        password: owner.RegisterForm.password,
      }
   }).then(function (response) {
     
    if(response["data"]["info"]["result"]!="fail") 
    {
 owner.$router.replace('/Register/newPersonInfo')}
  })
  .catch(function (error) {
    console.log(error);
  });
      }
  })
  .catch(function (error) {
    console.log(error);
  });
      },

    }
  }

</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../styles/mixin.scss";
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color:  #fff;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color:  #fff;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #ffffff;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>

