import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'flv' }
    },
    {
      path: '/blank',
      name: 'blank',
      component: require('@/components/Blank').default
    },
    {
      path: '/video',
      name: 'video',
      component: require('@/components/LandingPage').default
    }, {
      path: '/flv',
      name: 'flv',
      component: require('@/components/FlvTest').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
