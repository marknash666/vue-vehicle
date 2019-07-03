<template>
  <div class="text-left" style="margin-top: 30px">

    <el-form :model="VehicleInfo" :rules="rules" ref="VehicleInfo" label-width="120px" class="demo-ruleForm" style="width: 85%;">

      <el-form-item label="车架号" prop="vin" >
        <el-input class="login-form-input"
                  prefix-icon="el-icon-search"
                  v-model="VehicleInfo.vin">
        </el-input>
      </el-form-item>
      <el-form-item label="维修保养信息" prop="desc">
        <el-input
          class="login-form-input"
          type="textarea" :autosize="{ minRows: 3, maxRows: 8 }"
          resize="none"
          v-model="VehicleInfo.desc"></el-input>
      </el-form-item>
      <el-form-item label="维修备注" prop="remark">
        <el-select v-model="VehicleInfo.remark" placeholder="请选择活动区域">
          <el-option label="常规保养" value="Maintenance"></el-option>
          <el-option label="汽车维修" value="Repair"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="维修日期" required>
        <el-col :span="13">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="VehicleInfo.date1" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item class="btn-wrapper text-center" style="margin-right: 65px">
        <el-button type="primary" @click="submitForm('VehicleInfo')">提交信息</el-button>
        <el-button @click="resetForm('VehicleInfo')">重置信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import GLOBAL from  '@/store/global_variable.js'
  import Qs from 'qs'
  export default {
    name:"add-vehicle-info",
    data() {
      return {
        VehicleInfo: {
          vin: '12345645645456545',
          date1: '',
          remark: 'Maintenance',
          desc: '常规保养 56157km 2016-7-12<br/>\n' +
            '项目：5000公里常规保养，刹车油更换，燃油滤清器更换，空气滤芯<br/>\n' +
            '材料：<br/>\n' +
            '机油滤清器：1 <br/>\n' +
            '放油螺栓：1 <br/>\n' +
            '制动液：1 <br/>\n' +
            '空滤器滤芯2.0:1 <br/>\n' +
            '燃油滤清器：1 <br/>\n' +
            '优选机油：1 <br/>\n' +
            'PM2.5 活性炭空调滤芯： 1'
        },
        rules: {
          vin: [
            { required: true, trigger: 'blur',message: '车架号不能为空' },
            { type: 'string', message: '车价号必须为数字和字母的组合'},
            { min: 17, max: 17, message: '车架号长度为17位', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请选择维修备注', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写具体维修信息', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this=this
        let data = {
          address: GLOBAL.contract_address,
          vin:  _this.VehicleInfo.vin,
          remarks: _this.VehicleInfo.remark,
          info:_this.VehicleInfo.desc
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let status;
            const h = this.$createElement;
            this.$notify({
              title: '提交',
              message:  '汽车维修信息已提交',
              duration: 1500
            });
            console.log("weixiuxinxi", this.VehicleInfo);
            console.log("response", data);
            _this.axios.post('updateVehicleMaintenance/',data)
              .then(function (response) {
                status = response.data.status;
                if(status)
                {
                  _this.$message({
                    message:  '汽车维修信息成功上传  车架号为：'+_this.VehicleInfo.vin,
                    type: 'success'
                  });
                }
                else{
                  _this.$message.error('汽车维修信息失败失败  车架号：'+_this.VehicleInfo.vin+'不存在');
                }
              })
              .catch(function (error)
              {
                console.log(error);
              });

          } else {
            const h = this.$createElement;
            this.$notify({
              title: '提交',
              message:  '汽车维修信息有误',
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

  .login-form-input  >>> .el-input__inner{
    box-shadow:1px 1px 3px 1px darkgray;
    border:1px solid #CCC;
  }

</style>
