<template>
  <div id="wrapper">
    <!-- <VideoComp /> -->
    <VideoLive :class="['animate__animated', 'animate__fadeInRight' ,isLeave?'animate__fadeOutRight':'animate__fadeInRight']"/>
  </div>
</template>

<script>
// import VideoComp from './VideoMonitorDialog'
import VideoLive from './VideoLive'
export default {
  name: 'landing-page',
  components: {
    // VideoComp,
    VideoLive
  },
  data () {
    return {
      isLeave: false
    }
  },
  beforeRouteLeave (to, from, next) {
    this.isLeave = true
    setTimeout(() => {
      next()
    }, 800)
  }
}
</script>

<style>
  #wrapper{
    width: 445px;
    height: 640px;
    overflow: hidden;
  }
  h1{
    position: absolute;
    z-index: 9999;
  }
</style>
