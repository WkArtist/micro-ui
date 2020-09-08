<template>
  <div class="message-box-wrap">
      <div class="title animate__animated animate__delay-1s animate__fadeInRight">
          <div class="text">视频监控</div>
          <i class="close-icon el-icon-close" @click="closeVideo"></i>
      </div>
      <div class="content animate__animated animate__delay-2s animate__fadeInRight">
          <div class="content-wrap">
            <div class="important-wrap">
              <div
                class="item-wrap"
                v-for="(ele,index) in videoData"
                :key="ele.name">
                <video-player
                    class="video video-player vjs-custom-skin"
                    :options="{
                      controls: false,
                      autoplay: true,
                      muted: false,
                      loop: false,
                      preload: 'auto',
                      language: 'zh-CN',
                      aspectRatio: '16:9',
                      fluid: true,
                      playbackRates: [0.7, 1.0, 1.5, 2.0],
                      sources: [{
                        type: 'rtmp/mp4',
                        src: `rtmp://58.200.131.2:1935/livetv/cctv${index+1}`
                      }],
                      width: 180,
                      notSupportedMessage: '此视频暂时无法播放，请稍后再试',
                      techOrder: ['flash'],
                      flash: {
                        hls: { withCredentials: false }
                      }
                    }"
                    :playsinline="true"
                    ref="videoPlayer"/>
                <!-- <video class="video" muted :src="ele.url" autoplay loop="loop"></video> -->
                <div class="tip">
                    <i class="colorGreen" v-show="ele.status"></i>
                    <i class="colorRed" v-show="!ele.status"></i>
                    <span class="text">{{ele.name}}</span>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoData: [
        {
          name: 'A1疏散出口',
          status: true,
          url: require('../assets/video/scenery/normal/m1.mp4')
        },
        {
          name: 'A2疏散出口',
          status: true,
          url: require('../assets/video/scenery/normal/m2.mp4')
        },
        {
          name: 'B1消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m3.mp4')
        },
        {
          name: 'B2消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m4.mp4')
        },
        {
          name: 'B3消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m5.mp4')
        },
        {
          name: 'B4消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m6.mp4')
        },
        {
          name: 'C1消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m7.mp4')
        },
        {
          name: 'C2消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m8.mp4')
        },
        {
          name: 'C3消防通道',
          status: true,
          url: require('../assets/video/scenery/normal/m9.mp4')
        },
        {
          name: 'D1车辆出入口',
          status: true,
          url: require('../assets/video/scenery/normal/m10.mp4')
        }
      ],
      // videoUrl: [
      //   require('../assets/video/scenery/normal/m1.mp4'),
      //   require('../assets/video/scenery/normal/m2.mp4'),
      //   require('../assets/video/scenery/normal/m3.mp4'),
      //   require('../assets/video/scenery/normal/m4.mp4')
      // ],
      currentLoadVideo: 0,
      currentScan: 0,
      playerOptions: {
        controls: false,
        autoplay: true,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'rtmp/mp4',
          src: ''
        }],
        width: 180,
        notSupportedMessage: '此视频暂时无法播放，请稍后再试',
        techOrder: ['flash'],
        flash: {
          hls: { withCredentials: false }
        }
      },
      liveOrigin: [
        'rtmp://58.200.131.2:1935/livetv/hunantv',
        'rtmp://58.200.131.2:1935/livetv/cctv2',
        'rtmp://58.200.131.2:1935/livetv/cctv5',
        'rtmp://58.200.131.2:1935/livetv/cctv13'
      ]
    }
  },
  methods: {
    closeVideo () {
      console.log('关闭窗口')
      this.$electron.ipcRenderer.send('closeVideo')
    },
    // 延迟加载视频
    videoLoad () {
      this.currentLoadVideo = 4
      // this.videoUrl = []
      const intervalId2 = setInterval(() => {
        this.videoUrl.push(this.videoData[this.currentLoadVideo].url)
        this.currentLoadVideo += 1
        if (this.currentLoadVideo > this.videoData.length - 1) {
          clearInterval(intervalId2)
        }
      }, 500)
    }
  },
  mounted () {
    // console.log(document.documentElement.clientWidth)
    // this.videoLoad()
  }
}
</script>

<style>
    .message-box-wrap{
      color: #fff;
      height: 640px;
      background-color: rgba(0,0,0,0.2);
      opacity: 1;
      width: 410px;
    }
    .message-box-wrap .title{
      position: absolute;
      left: 0;
      top: 0;
      width: 0px;
      height: 40px;
      background-color: rgba(0,0,0,0.6);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 400px;
      opacity: 1;
    }
    .message-box-wrap .title .text{
        margin-left: 15px;
        font-size: 18px;
        display: flex;
        overflow: hidden;
        height: 40px;
        width: 130px;
        line-height: 40px;
    }
    .message-box-wrap .title .text::before{
        content: '';
        display: block;
        width: 3px;
        height: 16px;
        margin-top: 12px;
        background-color: #FFBB33;
        margin-right: 5px;
    }
    .message-box-wrap .title .el-icon-close{
        margin-right: 5px;
        cursor: pointer;
    }
    .message-box-wrap .content{
        position: absolute;
        left: 0;
        top: 50px;
        width: 400px;
        height: 580px;
        box-sizing: border-box;
        background-color: rgba(0,0,0,0.5);
    }
    .message-box-wrap .content .content-wrap{
      width: 100%;
      height: 100%;
      padding: 15px;
      box-sizing: border-box;
      position: relative;
      font-weight: 600;
      
    }
    .content-wrap .important-wrap{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        
      }
      .content-wrap .important-wrap .item-wrap{
          width: 180px;
          height: 101px;
          position: relative;
          
        }
      .content-wrap .important-wrap .item-wrap .video{
          width: 100%;
          height: 100%;
        }
      .content-wrap .important-wrap .item-wrap .tip{
        height: 12px;
        line-height: 8px;
        padding: 5px 5px;
        position: absolute;
        left: 10px;
        top: 10px;
        background-color: rgba(0,0,0,0.2);
      }
      .content-wrap .important-wrap .item-wrap .tip i{
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 8px;
        margin-right: 6px;
      }
      .content-wrap .important-wrap .item-wrap .tip span{
        font-size: 12px;
        font-weight: 400;
      }
      .content-wrap .important-wrap .item-wrap .tip i.colorGreen{
        background-color: #14C714;
      }
      .content-wrap .important-wrap .item-wrap .tip i.colorRed{
        background-color: #D95771;
      }
    
</style>
