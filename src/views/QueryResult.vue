<template>
  <div>

    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-2 shape-default shape-skew">
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
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3  text-white">维修信息查询系统
                  <span>{{"车架号："+ this.$route.query.VIN}}</span>
                </h1>
                <p class="lead  text-white" v-html="ManufactureInfo"></p>

              </div>
            </div>
          </div>
        </div>
      </section>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span ></span>
    </div>
    <section class="section section-lg pt-lg-0 mt--200">
      <div class="container">
        <div class="vm-image-list">
          <el-row class="image-list" :gutter="20" >
            <el-col :lg="8" :sm="20" class="vm-margin" v-for="(record,index) in Records" :key="record.TimeStamp" >
                <el-card class="border-0 newcard" hover shadow body-classes="py-5" >
                  <icon name="ni ni-check-bold" type="primary" rounded class="mb-4">
                  </icon>
                  <h6 class="text-primary text-uppercase">{{"MaintenanceRecord " + index}}</h6>
                  <p class="description mt-3 fixed-height" v-html="record.MaintenanceInfo"></p>
                  <div>
                    <badge type="warning" rounded>{{record.MaintenanceShopAddress}}</badge>
                    <badge type="success" rounded>{{record.TimeStamp}}</badge>
                  </div>
                  <base-button tag="a" href="#" type="primary" class="mt-4">
                   {{record.remark}}
                  </base-button>
                </el-card>
            </el-col>
          </el-row>
              </div>

        </div>
    </section>










  </div>
</template>

<script>
  import GLOBAL from  '@/store/global_variable.js'
  export default {
    name: "home",
    data() {
      return {
        ManufactureInfo: "",
        Records: [

        ]
      }
    } ,
    components: {},
    created() {
      var _this = this
      var input_vin = this.$route.query.VIN
      var params = {
        address:GLOBAL.contract_address,
        VIN:input_vin
      }
      console.log("print 342234", input_vin);
      _this.axios.get('getVehicleTotalInfo/',{params})
        .then(function (response) {
          console.log("print computed", response);
          _this.ManufactureInfo = response.data.ManufactureInfo;
          _this.Records=  response.data.Records;
        })




    }
  };
</script>
<style scoped>
  .newcard{
    min-height:550px;
    max-height:585px;
  }
  .fixed-height{
    min-height: 265px;
    max-height: 300px;
  }

  .vm-margin{
    margin-bottom: 30px;

  }

</style>
