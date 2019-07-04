<template>

  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-1 bg-gradient-warning shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <!-- shape Hero -->
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300">
          <div class="row row-grid align-items-center">
            <div class="col-md-6">
              <div class="card bg-warning shadow border-0">
                <img :src="require('@/assets/img-1-1200x1000.jpg')" class="card-img-top">
                <blockquote class="card-blockquote">
                  <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                       class="svg-bg">
                    <polygon points="0,52 583,95 0,95" class="fill-warning"></polygon>
                    <polygon points="0,42 583,95 683,0 0,95" opacity=".2" class="fill-warning"></polygon>
                  </svg>
                  <h4 class="display-3 font-weight-bold text-white">汽车转让</h4>
                  <p class="lead text-italic text-white">汽车转让操作被智能合约成功处理后没有任何挽回的机会
                    ,在操作前请深思熟虑</p>
                </blockquote>
              </div>
            </div>
            <div class="col-md-6">
              <div class="pl-md-5">

                <h3>详解</h3>
                <p class="lead">汽车转让需要的参数：车架号 & 接受所有权者的区块链地址</p>
                <p>转让的前提：当前用户为该车架号对应汽车的车主</p>
                <p>一旦提示操作成功则权限会被立刻转让给该地址</p>
                <el-form :model="TransferInfo" :rules="rules" ref="TransferInfo" class="demo-ruleForm"
                         style="width: 100%;">
                  <el-form-item prop="toaddress">
                    <el-input class="login-form-input"
                              prefix-icon="fa fa-cloud-upload mr-2"
                              placeholder="接受者地址"
                              v-model="TransferInfo.toaddress">
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="vin">
                    <el-input class="login-form-input"
                              prefix-icon="fa fa-cloud-upload mr-2"
                              placeholder="车架号"
                              v-model="TransferInfo.vin">
                    </el-input>
                  </el-form-item>
                </el-form>

                <base-button type="warning" round block size="lg" @click="submitForm('TransferInfo')">
                  提交转让
                </base-button>
              </div>
            </div>
          </div>
        </card>
      </div>

    </section>

  </div>

</template>

<script>
  import GLOBAL from '@/store/global_variable.js'

  export default {
    name: "home",
    data() {
      return {
        TransferInfo: {
          toaddress: '',
          vin: ''
        },
        rules: {
          toaddress: [
            {required: true, trigger: 'blur', message: '接受者地址不能为空'},
            {type: 'string', message: '接受者地址必须为数字和字母的组合'},
            {min: 42, max: 42, message: '地址长度为42个字节', trigger: 'blur'}
          ],
          vin: [
            {required: true, trigger: 'blur', message: '车架号不能为空'},
            {type: 'string', message: '车价号必须为数字和字母的组合'},
            {min: 17, max: 17, message: '车架号长度为17位', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this=this
        let data = {
          address: GLOBAL.contract_address,
          toaddress: _this.TransferInfo.toaddress,
          vin:  _this.TransferInfo.vin
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let status;
            this.$notify({
              title: '转让',
              message:  '转让信息已提交',
              duration: 1500
            });
            console.log("response", data);
            _this.axios.post('transfer/',data)
              .then(function (response) {
                status = response.data.status;
                if(status)
                {
                  _this.$message({
                    message:  '汽车已转让 车架号为：'+_this.TransferInfo.vin+ '接受者为'+_this.TransferInfo.toaddress,
                    type: 'success'
                  });
                }
                else{
                  _this.$message.error('汽车转让失败 车架号不存在或没有权限操作');
                }
              })
              .catch(function (error)
              {
                console.log(error);
              });
            _this.resetForm(formName)
          } else {
            this.$notify({
              title: '提交',
              message:  '转让信息有误',
              duration: 1500
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$nextTick(()=>{
          this.$refs[formName].resetFields();

        })
      }
    },
    created:function(){

    }
  };
</script>
<style scoped>
  .newcard {
    min-height: 550px;
    max-height: 585px;
  }

  .fixed-height {
    min-height: 265px;
    max-height: 300px;
  }

  .vm-margin {
    margin-bottom: 30px;

  }

</style>
