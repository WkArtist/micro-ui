<template>
  <div class="flv-test">
      <video id="myvideo" ref="myvideo" @click="click"></video>
  </div>
</template>

<script>
import flv from 'flv.js'
export default {
  data () {
    return {
      player: null,
      playing: false
    }
  },
  created () {
    if (flv.isSupported()) {
      this.player = flv.createPlayer({
        type: 'flv',
        url: 'http://localhost:8000/live/STREAM_NAME.flv'
      })
    }
  },
  mounted () {
    const video = this.$refs.myvideo
    this.player.attachMediaElement(video)
    this.player.load()
  },
  methods: {
    click () {
      if (this.playing) {
        this.player.pause()
        this.playing = false
      } else {
        this.player.play()
        this.playing = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .flv-test{
        background-color: #abcdef;
    }
</style>