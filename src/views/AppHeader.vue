<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img :src="require('@/assets/white.png')">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img :src="require('@/assets/google.svg')">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
          <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
            <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
              <i class="ni ni-ui-04 d-lg-none"></i>
              <span class="nav-link-inner--text">权限级操作</span>
            </a>
            <div class="dropdown-menu-inner">
              <a href="#"
                 class="media d-flex align-items-center" @click="handleUpdate">
                <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                  <i class="ni ni-spaceship"></i>
                </div>
                <div class="media-body ml-3">
                  <h6 class="heading text-primary mb-md-1">更新维修记录</h6>
                  <p class="description d-none d-md-inline-block mb-0">已认证的维修点可以进行汽车维修保养记录的更新</p>
                </div>
              </a>

              <a href="#" @click="handleAddApprove"
                 class="media d-flex align-items-center">
                <div class="icon icon-shape bg-gradient-warning rounded-circle text-white">
                  <i class="ni ni-ui-04"></i>
                </div>
                <div class="media-body ml-3">
                  <h5 class="heading text-warning mb-md-1">认证维修点</h5>
                  <p class="description d-none d-md-inline-block mb-0">合约持有人可以进行维修点的授权</p>
                </div>
              </a>

            </div>
          </base-dropdown>
        <modal :show.sync="modals.modal3"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm4">
          <card type="secondary" shadow
                body-classes="px-lg-2   py-lg-8"
                header-classes="bg-white pb-5"
                class="border-0">
            <template>
              <div class="text-muted text-center mb-3">
                代码仓库
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img slot="icon" :src="require('@/assets/github.svg')">
                  Github
                </base-button>
                <base-button type="neutral">
                  <img slot="icon" :src="require('@/assets/google.svg')">
                  Solidity
                </base-button>
              </div>
            </template>
            <add-vehicle-info></add-vehicle-info>
          </card>
        </modal>
          <base-dropdown tag="li" class="nav-item">
            <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
              <i class="ni ni-collection d-lg-none"></i>
              <span class="nav-link-inner--text">Examples</span>
            </a>
            <router-link to="/landing" class="dropdown-item">Landing</router-link>
            <router-link to="/profile" class="dropdown-item">Profile</router-link>
            <router-link to="/login" class="dropdown-item">Login</router-link>
            <router-link to="/register" class="dropdown-item">Register</router-link>
          </base-dropdown>
        </ul>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <li class="nav-item">
          <el-tooltip class="item" effect="light" content="Star us on Github" placement="top-start">
            <a class="nav-link nav-link-icon" href="https://github.com/bisco-fcos"
               target="_blank" rel="noopener" data-toggle="tooltip">
              <i class="fa fa-github"></i>
              <span class="nav-link-inner--text d-lg-none">Github</span>
            </a>
          </el-tooltip>
        <li class="nav-item d-none d-lg-block ml-lg-4">
            <a target="_blank" rel="noopener" class="btn btn-neutral btn-icon"  @click="modals.modal2 = true">
                <span class="btn-inner--icon">
                  <i class="fa el-icon-postcard mr-2"></i>
                </span>
              <span class="nav-link-inner--text">登录</span>
            </a>
        <modal :show.sync="modals.modal2"
               body-classes="p-0"
               modal-classes="modal-dialog-centered modal-sm4">
          <card type="secondary" shadow
                body-classes="px-lg-2   py-lg-8"
                header-classes="bg-white pb-5"
                class="border-0">
            <template>
              <div class="text-muted text-center mb-3">
                通过私钥登录
              </div>
            </template>
            <loginWidget v-bind:modals="modals"></loginWidget>
          </card>
        </modal>
        </li>



      </ul>
    </base-nav>
  </header>
</template>
<script>
  import BaseNav from "@/components/BaseNav";
  import BaseDropdown from "@/components/BaseDropdown";
  import CloseButton from "@/components/CloseButton";
  import Modal from "@/components/Modal.vue";
  import AddVehicleInfo from "@/views/Modal/AddVehicleInfo";
  import LoginWidget from "@/views/Modal/LoginWidget";
  import GLOBAL from  '@/store/global_variable.js'
  export default {
    components: {
      BaseNav,
      CloseButton,
      BaseDropdown,
      Modal,
      AddVehicleInfo,
      LoginWidget
    },
    data() {
      return {
        modals: {
          modal3: false,
         modal2: false

        }
      }
    },
    methods:{
      handleUpdate(){
        console.log("sadasd",GLOBAL.userKey)
        if(GLOBAL.getuserKey()==undefined)
        {
          alert("在执行汽车维修保养信息更新之前，需要先进行登录以验证身份")
        }else{
          this.modals.modal3=true
        }
      },
      handleAddApprove(){
        console.log("sadasd",GLOBAL.userKey)
        if(GLOBAL.getuserKey()==undefined)
        {
          alert("在执行汽车维修保养信息更新之前，需要先进行登录以验证身份")
        }else{
          this.$router.push({path: '/AddApproved'})
        }
      }

    }
  };
</script>
<style>

</style>
