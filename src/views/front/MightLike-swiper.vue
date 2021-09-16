<template>
  <swiper
    class="swiper-container swiper-container-autoheight sale--container"
    :options="swiperOption" :class="{ 'pb-0' : mightLikeProduct.length <= 4 && screenWidth < 896}"
  >
    <div
      is="swiper-slide"
      v-for="item in mightLikeProduct"
      :key="'item' + item.id"
      class="card content sale--content"
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
    </div>
    <div class="swiper-pagination sale--pagination"
    slot="pagination" :class="{ 'invisible' : mightLikeProduct.length <= 4 && screenWidth < 896}"
    ></div>
    <!-- <div class="swiper-pagination sale--pagination" slot="pagination" ></div> -->
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
  props: ['descriptions'],
  data() {
    return {
      products: [],
      mightLikeProduct: [],
      screenWidth: document.body.clientWidth,
      swiperOption: {
        direction: 'horizontal',
        speed: 2000,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        watchOverflow: true,
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
      const num = Math.floor(Math.random() * vm.descriptions.length);
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.mightLikeProduct = vm.products.filter((item) => item.description.includes(
          vm.descriptions[num],
        ));
      });
    },
    getStauts() {
      const vm = this;
      if (vm.mightLikeProduct.length > 4) {
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
  mounted() {
    this.getProducts();
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
.sale--content {
  height: auto;
}
</style>
