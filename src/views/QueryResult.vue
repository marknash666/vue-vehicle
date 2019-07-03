<template>
  <div>

    <div class="position-relative">
      <!-- shape Hero -->
      <section class="section-shaped my-0">
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
        <div class="container shape-container d-flex">
          <div class="col px-0">
            <div class="row">
              <div class="col-lg-6">
                <h1 class="display-3  text-white">维修信息查询系统
                  <span>{{"车架号："+ this.$route.query.VIN}}</span>
                </h1>
                <p class="lead  text-white">{{ManufactureInfo}}</p>

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
                    <badge type="primary" rounded>{{record.MaintenanceShopAddress}}</badge>
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



    <section class="section section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-1 bg-gradient-warning shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </section>

    <section class="section section-lg">
      <div class="container">
        <div class="row justify-content-center text-center mb-lg">
          <div class="col-lg-8">
            <h2 class="display-3">The amazing Team</h2>
            <p class="lead text-muted">According to the National Oceanic and Atmospheric Administration,
              Ted, Scambos, NSIDClead scentist, puts the potentially record maximum.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img v-lazy="'img/theme/team-1-800x800.jpg'"
                   class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                   style="width: 200px;">
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">Ryan Tompson</span>
                  <small class="h6 text-muted">Web Developer</small>
                </h5>
                <div class="mt-3">
                  <base-button tag="a" href="#" type="warning" icon="fa fa-twitter" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="warning" icon="fa fa-facebook" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="warning" icon="fa fa-dribbble" rounded
                               icon-only></base-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img v-lazy="'img/theme/team-2-800x800.jpg'"
                   class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                   style="width: 200px;">
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">Romina Hadid</span>
                  <small class="h6 text-muted">Marketing Strategist</small>
                </h5>
                <div class="mt-3">
                  <base-button tag="a" href="#" type="primary" icon="fa fa-twitter" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="primary" icon="fa fa-facebook" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="primary" icon="fa fa-dribbble" rounded
                               icon-only></base-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img v-lazy="'img/theme/team-3-800x800.jpg'"
                   class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                   style="width: 200px;">
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">Alexander Smith</span>
                  <small class="h6 text-muted">UI/UX Designer</small>
                </h5>
                <div class="mt-3">
                  <base-button tag="a" href="#" type="info" icon="fa fa-twitter" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="info" icon="fa fa-facebook" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="info" icon="fa fa-dribbble" rounded
                               icon-only></base-button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
            <div class="px-4">
              <img v-lazy="'img/theme/team-4-800x800.jpg'"
                   class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                   style="width: 200px;">
              <div class="pt-4 text-center">
                <h5 class="title">
                  <span class="d-block mb-1">John Doe</span>
                  <small class="h6 text-muted">Founder and CEO</small>
                </h5>
                <div class="mt-3">
                  <base-button tag="a" href="#" type="success" icon="fa fa-twitter" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="success" icon="fa fa-facebook" rounded
                               icon-only></base-button>
                  <base-button tag="a" href="#" type="success" icon="fa fa-dribbble" rounded
                               icon-only></base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section section-lg pt-0">
      <div class="container">
        <card gradient="warning"
              no-body
              shadow-size="lg"
              class="border-0">
          <div class="p-5">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h3 class="text-white">We made website building easier for you.</h3>
                <p class="lead text-white mt-3">I will be the leader of a company that ends up being
                  worth billions of dollars, because I got the answers. I understand culture.</p>
              </div>
              <div class="col-lg-3 ml-lg-auto">
                <base-button tag="a" href="https://www.creative-tim.com/product/vue-argon-design-system"
                             type="white" block size="lg">
                  Download Vue
                </base-button>
              </div>
            </div>
          </div>
        </card>
      </div>
    </section>
    <section class="section section-shaped my-0 overflow-hidden">
      <div class="shape shape-style-3 bg-gradient-default shape-skew">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="container pt-lg pb-300">
        <div class="row text-center justify-content-center">
          <div class="col-lg-10">
            <h2 class="display-3 text-white">Build something</h2>
            <p class="lead text-white">According to the National Oceanic and Atmospheric Administration,
              Ted, Scambos, NSIDClead scentist, puts the potentially record low maximum sea ice extent
              tihs year down to low ice.</p>
          </div>
        </div>
        <div class="row row-grid mt-5">
          <div class="col-lg-4">
            <icon name="ni ni-settings" size="lg" gradient="white" shadow round color="primary"></icon>
            <h5 class="text-white mt-3">Building tools</h5>
            <p class="text-white mt-3">Some quick example text to build on the card title and make up the
              bulk of the card's content.</p>
          </div>
          <div class="col-lg-4">
            <icon name="ni ni-ruler-pencil" size="lg" gradient="white" shadow round color="primary"></icon>
            <h5 class="text-white mt-3">Grow your market</h5>
            <p class="text-white mt-3">Some quick example text to build on the card title and make up the
              bulk of the card's content.</p>
          </div>
          <div class="col-lg-4">
            <icon name="ni ni-atom" size="lg" gradient="white" shadow round color="primary"></icon>
            <h5 class="text-white mt-3">Launch time</h5>
            <p class="text-white mt-3">Some quick example text to build on the card title and make up the
              bulk of the card's content.</p>
          </div>
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
