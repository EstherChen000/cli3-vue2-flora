import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import $ from 'jquery';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import clipboard from 'clipboard';
import AOS from 'aos';
import 'aos/dist/aos.css';

import App from './App.vue';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import dateFilter from './filters/date';

Vue.config.productionTip = false;
Vue.prototype.clipboard = clipboard;
Vue.use(VueAxios, axios);
Vue.use(VueI18n);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);
window.$ = $;

const i18n = new VueI18n({
  locale: 'zhTW',
});

Vue.use(VeeValidate, {
  events: 'input|blur', // 這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW,
  },
});

Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);

axios.defaults.withCredentials = true;// 將cookie存到前端

new Vue({
  created() {
    AOS.init();
  },
  i18n,
  router,
  render: (h) => h(App),
}).$mount('#app');

// 由於目前的執行環境非為vue的元件內,而是在router下.因此無法直接使用this.$http,需替換成axios
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) { // 當要到達的頁面需要驗證時,檢查是否持續登入
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) { // 若在登入狀態直接放行,無則進入登入頁
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
