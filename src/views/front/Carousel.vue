<template>
  <div
    id="indexCover"
    class="carousel slide carousel-fade row"
    data-ride="carousel"
  >
    <ol class="carousel-indicators">
      <li
        data-target="#carouselExampleIndicators"
        data-slide-to="0"
        class="active"
      ></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active ">
        <img :src="cover01" class="d-block w-100" alt="新會員特惠活動" />
      </div>
      <div class="carousel-item ">
        <img :src="cover02" class="d-block w-100" alt="周年慶特惠活動" />
      </div>
      <div class="carousel-item ">
        <img :src="cover03" class="d-block w-100" alt="在家防疫特惠活動" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-env jquery */
// 圖片匯入
import coverL01 from '@/assets/img/b_home_01.jpg';
import coverL02 from '@/assets/img/b_home_02.jpg';
import coverL03 from '@/assets/img/b_home_03.jpg';
import coverL04 from '@/assets/img/b_shop_01.jpg';
import coverL05 from '@/assets/img/b_shop_02.jpg';
import coverL06 from '@/assets/img/b_shop_03.jpg';
import coverS01 from '@/assets/img/b_home_01_s.jpg';
import coverS02 from '@/assets/img/b_home_02_s.jpg';
import coverS03 from '@/assets/img/b_home_03_s.jpg';
import coverS04 from '@/assets/img/b_shop_01_s.jpg';
import coverS05 from '@/assets/img/b_shop_02_s.jpg';
import coverS06 from '@/assets/img/b_shop_03_s.jpg';

export default {
  data() {
    return {
      coverL01,
      coverL02,
      coverL03,
      coverL04,
      coverL05,
      coverL06,
      coverS01,
      coverS02,
      coverS03,
      coverS04,
      coverS05,
      coverS06,
      cover01: coverL01,
      cover02: coverL02,
      cover03: coverL03,
    };
  },
  methods: {
    imgSize() {
      const vm = this;
      if (window.screen.width <= 400 && vm.$route.path.includes('/shop')) {
        vm.cover01 = vm.coverS04;
        vm.cover02 = vm.coverS05;
        vm.cover03 = vm.coverS06;
      } else if (window.screen.width <= 400) {
        vm.cover01 = vm.coverS01;
        vm.cover02 = vm.coverS02;
        vm.cover03 = vm.coverS03;
      } else if (window.screen.width > 400 && vm.$route.path.includes('/shop')) {
        vm.cover01 = vm.coverL04;
        vm.cover02 = vm.coverL05;
        vm.cover03 = vm.coverL06;
      } else if (window.screen.width > 400) {
        vm.cover01 = vm.coverL01;
        vm.cover02 = vm.coverL02;
        vm.cover03 = vm.coverL03;
      }
    },
  },
  created() {
    this.imgSize();
  },
  updated() {
    this.imgSize();
  },
  mounted() {
    $('#indexCover').carousel({
      interval: 4000,
    });
  },
};
</script>
