<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
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
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-7">
          <card type="secondary" shadow
                body-classes="px-lg-2 py-lg-5"
                class="border-0">
            <template>
              <div class="text-center text-muted mb-4">
                <span>汽车出厂信息添加</span>
              </div>
              <el-form :model="VehicleInfo" :rules="rules" ref="VehicleInfo" label-width="120px" class="demo-ruleForm"
                       style="width: 85%;">

                <el-form-item label="车架号" prop="vin">
                  <el-input class="login-form-input"
                            prefix-icon="el-icon-search"
                            v-model="VehicleInfo.vin">
                  </el-input>
                </el-form-item>
                <el-form-item label="出厂信息" prop="desc">
                  <el-input
                    class="login-form-input"
                    type="textarea" :autosize="{ minRows: 3, maxRows: 8 }"
                    resize="none"
                    v-model="VehicleInfo.desc"></el-input>
                </el-form-item>
                <el-form-item label="登记日期" required>
                  <el-col :span="13">
                    <el-form-item prop="date1">
                      <el-date-picker type="date" placeholder="选择日期" v-model="VehicleInfo.date1"
                                      style="width: 100%;"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item class="btn-wrapper text-center" style="margin-right: 65px">
                  <el-button type="primary" @click="submitForm('VehicleInfo')">提交信息</el-button>
                  <el-button @click="resetForm('VehicleInfo')">重置信息</el-button>
                </el-form-item>
              </el-form>
            </template>
          </card>
        </div>
      </div>
    </div>

  </section>
</template>
<script>
  import GLOBAL from  '@/store/global_variable.js'
  export default {
    name: "vehivleInitial",
    data() {
      return {
        VehicleInfo: {
          vin: 'JY62R5T67UYI903D8',
          date1: '',
          desc: '保时捷<br/>车辆铭牌是标明车辆基本特征的标牌。其主要内容包括车辆型号、发动机型号、发动机排量、发动机额定功率、车辆识别代号、总质量、载重量或载客人数、出厂编号、制造年月、制造国及厂名等。车辆铭牌一般位于车辆前部易于观察到的地方，如B柱下方<br/>'
        },
        rules: {
          vin: [
            {required: true, trigger: 'blur', message: '车架号不能为空'},
            {type: 'string', message: '车价号必须为数字和字母的组合'},
            {min: 17, max: 17, message: '车架号长度为17位', trigger: 'blur'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写具体维修信息', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this = this
        let data = {
          address: GLOBAL.contract_address,
          vin: _this.VehicleInfo.vin,
          originInfo: _this.VehicleInfo.desc+_this.VehicleInfo.date1
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let status;
            const h = this.$createElement;
            this.$notify({
              title: '提交',
              message: '汽车出厂信息已提交',
              duration: 1500
            });
            console.log("weixiuxinxi", this.VehicleInfo);
            console.log("response", data);
            _this.axios.post('manufactureInit/', data)
              .then(function (response) {
                status = response.data.status;
                if (status) {
                  _this.$message({
                    message: '汽车出厂信息成功上传 车架号为：' + _this.VehicleInfo.vin,
                    type: 'success'
                  });
                } else {
                  _this.$message.error('汽车出厂信息上传失败 没有权限操作或已初始化');
                }
              })
              .catch(function (error) {
                console.log(error);
              });

          } else {
            const h = this.$createElement;
            this.$notify({
              title: '提交',
              message: '汽车出厂信息有误',
              duration: 1500
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$nextTick(() => {
          this.$refs[formName].resetFields();

        })
      }
    }
  };
</script>
<style>
</style>
