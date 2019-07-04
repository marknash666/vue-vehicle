
<template>
  <div class="homepage-hero-module" >
    <queryWidget></queryWidget>
    <div class="video-container">
      <div :style="fixStyle" class="filter"></div>
      <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
        <source  :src="require('@/assets/Driving-a-Mercedes.mp4')" type="video/mp4"/>
        Your browser does not support the video tag. I suggest you upgrade your browser.
      </video>
      <div class="poster hidden" v-if="!vedioCanPlay">
        <img :style="fixStyle" :src="require('@/assets/Driving-a-Mercedes.jpg')" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import QueryWidget from './QueryWidget'
  export default {
    name: 'login',
    data() {
      return {
        vedioCanPlay: true,
        fixStyle: ''
      }
    },
    components: { QueryWidget },
    methods: {
      canplay() {
        this.vedioCanPlay = true
      }
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .homepage-hero-module
  {
    background: #00BC9B;
    height: 100%;
    width: 0px;
    overflow: hidden;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
  }
  .video-container {
    height: 100%;
    width: 0px;
    overflow: hidden;
  }
  .video-container .poster img,
  .video-container video {

    z-index: 0;
    position: fixed;
    right: 0px;

  }
  .video-container .filter {
    width: 2000px;
    opacity: 0.3;
    background-color: midnightblue;
    height: 1000px;
    left: 0;
    position: fixed;
    z-index: 1;
  }
</style>
