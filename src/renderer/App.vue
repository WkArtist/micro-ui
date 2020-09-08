<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'my-project',
    computed: {
      ...mapState(['Video']),
      hide () {
        return this.Video.hide
      },
      show () {
        return this.Video.show
      }
    },
    watch: {
      hide () {
        console.log('hide change')
        this.$router.push({name: 'blank'})
      },
      show () {
        console.log('show change')
        this.$router.push({name: 'video'})
      }
    }
  }
</script>

<style>
  /* CSS */
  * {
    margin: 0;
    padding: 0;
    font-family: PingFang-SC-Medium;
  }
  :root {
    --animate-delay: 0.3s !important;
  }
</style>
