<template>
  <div class="text-left" style="margin-top: 30px">

    <el-form :model="LoginInfo" :rules="rules" ref="LoginInfo" label-width="120px" class="demo-ruleForm"
             style="width: 85%;">
      <el-form-item label="私钥" prop="userKey">
        <el-input class="login-form-input"
                  prefix-icon="el-icon-search"
                  v-model="LoginInfo.userKey">
        </el-input>
      </el-form-item>
      <el-form-item class="btn-wrapper text-center" style="margin-right: 65px">
        <el-button type="primary" @click="submitForm('LoginInfo')">提交私钥</el-button>
        <el-button @click="resetForm('LoginInfo')">重置私钥</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import GLOBAL from '@/store/global_variable.js'

  export default {
    name: "loginWidget",
    data() {
      return {
        LoginInfo: {
          userKey: ''
        },
        rules: {
          userKey: [
            {required: true, trigger: 'blur', message: '私钥不能为空'},
            {type: 'string', message: '私钥必须为数字和字母的组合'},
            {min: 64, max: 64, message: '私钥长度为64位字节', trigger: 'blur'}
          ]
        }
      };
    },
    props: {
      modals: {
        type: Object,
        required: true
      }

    },
    methods: {
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            GLOBAL.setuserKey(_this.LoginInfo.userKey);
            const h = this.$createElement;
            this.$notify({
              title: '登录',
              message: '用户私钥已设置',
              duration: 1500
            });
            let data = {
              userKey: GLOBAL.getuserKey()
            }
            _this.axios.post('changeUser/', data)
              .then(function (response) {
                _this.modals.modal2 = false
                let status = response.data.status;
                if (status)
                  setTimeout(() => {
                    _this.$message({
                      message: '后端已接收私钥',
                      type: 'success'
                    });
                  }, 400);
              })
          } else {
            this.$notify.error({
              title: '登录',
              message: '用户私钥有误，请重新核对',
              duration: 1500
            });
          }
        })
      },
      success_msg() {

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
    width: 80%;
    position: absolute;
    z-index: 2;
    color: #fff;
  }

  .login-form-input >>> .el-input__inner {
    box-shadow: 1px 1px 3px 1px darkgray;
    border: 1px solid #CCC;
  }

</style>
