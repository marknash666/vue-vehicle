<template>
  <div class="login-container">
      
    <el-form autoComplete="on" :model="InfoForm"  ref="InfoForm" label-position="left"
             label-width="0px"
             class="card-box login-form">
      <h3 class="title">你的个人信息</h3>
  
      <el-form-item prop="name" label="姓名" label-width="80px">
        <el-input v-model="InfoForm.name" autoComplete="on"  placeholder="请输入姓名"/>
      </el-form-item>
      <el-form-item prop="phone" label="手机号" label-width="80px">
        <el-input  v-model="InfoForm.phone" autoComplete="on"  placeholder="请输入手机号"/>
      </el-form-item>
      <el-form-item prop="address" label="地址" label-width="80px">
        <el-input  v-model="InfoForm.address" autoComplete="on"  placeholder="请输入地址"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="submit">
         提交
        </el-button>
       
      </el-form-item>

<el-form-item>
       <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="goBack">
          返回
        </el-button></el-form-item>
    </el-form>

  </div>
</template>
<script>
  export default {
    name: 'Info',
    data() {
      return {
        InfoForm: {
          name: '',
          phone: '',
          address: ''
        },
        loading: false
      }
    },
    methods: {
      goBack() {
      this.$router.replace('/Home')
      },
submit()
{  const owner = this
        if(this.InfoForm.name=="")alert("姓名不能为空")
       else if(this.InfoForm.phone=="")alert("请输入您的手机号")
       else if(this.InfoForm.address=="")alert("请输入你的地址")
      else 
    this.$http({
      method: 'post',
      url: '/api/Info/updateInfo',
      data: {
        name: this.InfoForm.name,
        phone: this.InfoForm.phone,
        address:this.InfoForm.address
      }
   }).then(function (response) {
    console.log(response); 
    if(response["data"]!="1")alert("提交失败")
   else {
      alert("提交成功")
      owner.$router.replace("/Home")
      }
  })
  .catch(function (error) {
    console.log(error);
  });
}
    },
    created(){ 
  const owner = this
   this.$http({ method: 'get', url: '/api/Info/getInfo'})
   .then(function (response) {
owner.InfoForm.name=response.data.nickname
owner.InfoForm.address=response.data.address
owner.InfoForm.phone=response.data.phone
  console.log(response)
   })
  .catch(function (error) {
    console.log(error);
  });
  }
  }

</script>
<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";
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
      color: $light_gray;
       font-size: 20px;
      height: 47px;
    }
   /* .el-input {
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
    }*/
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
    
  }
</style>

