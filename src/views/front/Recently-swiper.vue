<template>
  <swiper
    class="swiper-container swiper-container-autoheight sale--container"
    :options="swiperOption"
    :class="{ 'pb-0': recentlyList.length <= 4 }"
  >
    <div
      is="swiper-slide"
      v-for="item in recentlyProducts"
      :key="'item' + item.id"
      class="card content"
    >
      <router-link :to="`/shop/product_detail/${item.id}`" target="_blank">
        <div class="content-overlay"></div>
        <div
          style="height: 300px; background-size: cover; background-position: center"
          :style="{ backgroundImage: `url(${item.imageUrl})` }"
        ></div>
        <div class="card-body overflow-hidden" style="height: 100px;">
          <span class="badge badge-primary float-right ml-2">
            {{ item.category }}
          </span>
          <h5 class="card-title text-truncate">{{ item.title }}</h5>
          <p class="card-text float-right">
            NT{{ item.price | currency
            }}<span class="text-danger small">sale</span>
          </p>
          <p class="card-text font-italic text-black-50">
            <del>NT{{ item.origin_price | currency }}</del>
          </p>
        </div>
        <div class="content-details text-light">
          <button class="btn btn-danger">
            查看產品細節<i class="fas fa-arrow-circle-right ml-1"></i>
          </button>
        </div>
      </router-link>
      <span class="content-del" @click="delStorage(item)"
        ><i class="fas fa-times"></i
      ></span>
    </div>
    <div
      class="swiper-pagination sale--pagination"
      slot="pagination"
      :class="{ invisible: recentlyList.length <= 4 }"
    ></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      id: '',
      recentlyList: [],
      products: [],
      recentlyProducts: [],
      swiperOption: {
        direction: 'horizontal',
        speed: 2000,
        loop: true,
        loopFillGroupWithBlank: true,
        watchOverflow: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        autoplay: false,
        breakpoints: {
          // when window width is >= 896px
          897: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween: 30,
          },
          // when window width is >= 668px
          668: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 20,
          },
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 10,
          },
        },
      },
    };
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.recentlyProducts = vm.products.filter((item) => vm.recentlyList.includes(item.id));
      });
    },
    getStorage() {
      const vm = this;
      // 首次進入此頁的情況
      if (localStorage.getItem('recentlyList') === null) {
        const rList = [];
        rList.push(vm.id);
        localStorage.setItem('recentlyList', JSON.stringify(rList));
      } else {
        const rList = JSON.parse(localStorage.getItem('recentlyList'));
        vm.recentlyList = rList;
        if (!rList.includes(vm.id)) {
          rList.push(vm.id);
        }
        localStorage.setItem('recentlyList', JSON.stringify(rList));
      }
    },
    delStorage(item) {
      const vm = this;
      let rList = [];
      vm.recentlyProducts.splice(
        vm.recentlyProducts.findIndex((e) => e.id === item.id),
        1,
      );
      vm.recentlyList = [];
      vm.recentlyProducts.forEach((e) => {
        vm.recentlyList.push(e.id);
      });
      rList = vm.recentlyList;
      // 清除ls
      localStorage.removeItem('recentlyList');
      // 重新加入ls
      if (!rList.includes(vm.id)) {
        rList.push(vm.id);
      }
      localStorage.setItem('recentlyList', JSON.stringify(rList));
      vm.getStauts();
    },
    getStauts() {
      const vm = this;
      if (vm.recentlyList.length > 4) {
        vm.swiperOption.autoplay = {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        };
      } else {
        vm.swiperOption.autoplay = false;
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getProducts();
    this.getStorage();
    this.getStauts();
  },
};
</script>

<style lang="scss" scoped>
.sale--container {
  height: auto;
  padding-bottom: 3rem;
  position: relative;
}
.sale--pagination {
  bottom: 0rem;
  height: 3rem;
  line-height: 3rem;
}
</style>
