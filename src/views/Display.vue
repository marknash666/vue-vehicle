<template>
  <div>

    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
        <div class="shape shape-style-1 bg-gradient-success shape-skew">
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
                <h1 class="display-3  text-white">账号拥有的汽车
                </h1>
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
            <el-col :lg="8" :sm="20" class="vm-margin" v-for="(car,index) in cars" :key="car.vin" >
                <el-card class="border-0 newcard" hover shadow body-classes="py-5" >
                  <icon name="ni ni-check-bold" type="success" rounded class="mb-4">
                  </icon>
                  <h6 class="text-success text-uppercase">{{"汽车简要信息 " + index}}</h6>
                  <p class="description mt-3 fixed-height" v-html="car.info"></p>
                  <p class="description mt-3 fixed-height" v-html="car.vin"></p>
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
        cars: []
      }
    } ,
    components: {},
    created() {
      var _this = this
      var input_vin = this.$route.query.VIN
      var params = {
        address:GLOBAL.contract_address
      }
      _this.axios.get('getCarsByOwner/',{params})
        .then(function (response) {
          _this.cars = response.data.cars;
          console.log("print computed",  _this.cars);
        })




    }
  };
</script>
<style scoped>
  .newcard{
    min-height:300px;
    max-height:400px;
  }


  .vm-margin{
    margin-bottom: 30px;

  }

</style>
