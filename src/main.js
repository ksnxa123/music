// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'common/stylus/index.styl'

import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

import VueLazyload from 'vue-lazyload'

// or with options
Vue.use(VueLazyload, {
 loading: require('common/image/default.png')
})

Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
