<template>
  <div>
    <section class="section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-3 shape-primary shape-skew ">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container pt-lg pb-300">
        <div class="row text-center justify-content-center">
          <div class="col-lg-10">
            <h2 class="display-3 text-white">认可维修点添加</h2>
            <p class="lead text-white">本接口供管理员（合约持有者）添加合规的维修店地址到一个特定的集合中，即一次授权操作
            </p>
          </div>
        </div>
        <div class="row row-grid mt-5">
          <div class="col-lg-4">
            <icon name="ni ni-settings" size="lg" gradient="white" shadow round color="primary"></icon>
            <h5 class="text-white mt-3">仅管理员能进行添加</h5>
            <p class="text-white mt-3">其他用户在进行添加操作时会得到失败信息</p>
          </div>
          <div class="col-lg-4">
            <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon>
            <h5 class="text-white mt-3">认可的维修点</h5>
            <p class="text-white mt-3">认可的账号地址可以进行维修记录上传操作</p>
          </div>
          <div class="col-lg-4">
            <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon>
            <h5 class="text-white mt-3">划水HUAWATER</h5>
            <p class="text-white mt-3">现代泛指上班期间的偷懒行为。在WOW中流传最广的划水就是副本活动中“dps”没有达到本身该有的高度。</p>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg pt-lg-0 section-contact-us">
      <div class="container">
        <div class="row justify-content-center mt--300">
          <div class="col-lg-8">
            <card gradient="secondary" shadow body-classes="p-lg-5">
              <h4 class="mb-1">维修点添加</h4>
              <p class="mt-0">在添加时要仔细核对地址的正确性</p>
              <el-form :model="ApprovedInfo" :rules="rules" ref="ApprovedInfo" class="demo-ruleForm" style="width: 100%;">
                <el-form-item  prop="address" >
                  <el-input class="login-form-input"
                            prefix-icon="fa fa-cloud-upload mr-2"
                            placeholder="维修点地址"
                            v-model="ApprovedInfo.address">
                  </el-input>
                </el-form-item>
              </el-form>


              <base-button type="default" round block size="lg" @click="handleAddApprove('ApprovedInfo')">
                Send Message
              </base-button>
            </card>
          </div>
        </div>
      </div>
    </section>
    <div class="shape shape-style-1 shape-default shape-skew">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import GLOBAL from  '@/store/global_variable.js'
  export default {
    name: "AddApproved",
    data() {
      return {
        ApprovedInfo: {
          address: ''
        },
        rules: {
          address: [
            { required: true, trigger: 'blur',message: '维修点地址不能为空' },
            { type: 'string', message: '维修点地址必须为数字和字母的组合'},
            { min: 42, max: 42, message: '地址长度为42个字节', trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      handleAddApprove(formName)
      {
        let _this =this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              address: GLOBAL.contract_address,
              approved:_this.ApprovedInfo.address
            }
            _this.axios.post('addApprovedMaintenanceShop/',data)
              .then(function (response) {
                let status = response.data.status;
                console.log(status)
                if (status) {
                  _this.$message({
                    message: '汽车维修点地址成功添加',
                    type: 'success'
                  });
                }else{
                  _this.$message.error('汽车维修点地址添加失败');
                }
              })


          }
          else{
            this.$notify.error({
              title: '错误',
              message: '维修店地址格式有误'
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-form-input  >>> .el-input__inner{
    box-shadow:1px 1px 3px 1px darkgray;
    border:1px solid #CCC;
  }
</style>
