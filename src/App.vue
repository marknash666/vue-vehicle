<template>
  <div id="app">
    <router-view name="header"></router-view>
    <main>
      <fade-transition origin="center" mode="out-in" :duration="250">
        <router-view/>
      </fade-transition>
    </main>
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
  import {FadeTransition} from "vue2-transitions";
  import Web3 from "web3"

  export default {
    components: {
      FadeTransition
    },
    data() {
      return {
        web3js: '',
        timer: ''
      }
    },
    /*mounted: async function  () {
      let _this = this
      window.addEventListener('load', async function () {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        let web3 = window.web3
        if (typeof web3 != 'undefined') {
        } else {
          alert('You should install MetaMask');
        }

      })

      _this.web3js = new Web3(window.web3.currentProvider);
      console.log("zhanghu", _this.web3js.eth)
      let accounts = await  _this.web3js.eth.getAccounts();
      _this.web3js.eth.getCoinbase().then(console.log);
      let cur_account = accounts[0];
      console.log("zhanghu", cur_account)
    }*/
  };
</script>

<style scoped>
  #app {

  }
</style>
