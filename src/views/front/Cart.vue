<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-primary bg-white">
      <h1>
        <router-link to="/" class="navbar-brand logo-font">Flora</router-link>
      </h1>
    </nav>
    <div class="container-fluid px-0">
      <div
        class="my-5 row flex-column justify-content-center
        align-items-center bg-light pt-5 w-100 mx-0 px-0"
      >
        <div class="col-md-6 col-sm-12 position-relative">
          <div class="checkout-breadcrumb m-auto">
            <div
              class="scb-item"
              :class="{ 'scb-current': whereIs === '購物車內容' }"
            >
              購物車內容
            </div>
            <div
              class="scb-item"
              :class="{ 'scb-current': whereIs === '填寫資訊' }"
            >
              填寫資訊
            </div>
            <div
              class="scb-item"
              :class="{ 'scb-current': whereIs === '確認付款' }"
            >
              確認付款
            </div>
            <div
              class="scb-item"
              :class="{ 'scb-current': whereIs === '付款完成' }"
            >
              付款完成
            </div>
          </div>
        </div>
      </div>
      <div class="w-100">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      whereIs: '',
    };
  },
  methods: {
    breadcrumbPicker() {
      const vm = this;
      const pathID = `/cart/cart_confirmation/${vm.id}`;

      if (vm.$route.path === '/cart/cart_order') {
        vm.whereIs = '購物車內容';
      } else if (vm.$route.path === '/cart/cart_checkout') {
        vm.whereIs = '填寫資訊';
      } else if (vm.$route.path === pathID) {
        vm.whereIs = '確認付款';
      } else if (vm.$route.path === '/cart/cart_final') {
        vm.whereIs = '付款完成';
      }
    },
    catchId() {
      const vm = this;
      const pathString = vm.$route.path;
      // 賦予路徑字串中,屬於ID部分的值
      vm.id = pathString.substr(24, 20);
    },
  },
  updated() {
    this.catchId();
    this.breadcrumbPicker();
  },
  created() {
    this.breadcrumbPicker();
  },
};
</script>

<style lang="scss" scoped>
.checkout-breadcrumb {
  display: flex;
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
  counter-reset: checkout-breadcrumb;
  font-size: 0;
  font-family: "Roboto", "Helvetica", sans-serif;
}
.checkout-breadcrumb .scb-item {
  display: inline-block;
  flex-grow: 1;
  flex-basis: 33%;
  font-size: 1rem;
  font-weight: 500;
  line-height: 3;
  padding: 3rem 0;
  position: relative;
  z-index: 10;
  opacity: 1;
}
.checkout-breadcrumb .scb-item.scb-current {
  opacity: 1;
  font-weight: bold;
}
.checkout-breadcrumb .scb-item.scb-current:after {
  background: #0b5345;
  display: block;
  position: absolute;
  top: 0px;
  left: 50%;
  left: calc(50% - 1.5em);
  z-index: 10;
  box-shadow: 0 0 0 5px white;
  color: white;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  padding: 0px;
  line-height: 3rem;
}
.checkout-breadcrumb .scb-item:after {
  counter-increment: checkout-breadcrumb;
  content: counter(checkout-breadcrumb);
  display: block;
  position: absolute;
  top: 0px;
  left: 50%;
  left: calc(50% - 1.5em);
  z-index: 10;
  background: #ccc;
  box-shadow: 0 0 0 5px white;
  color: white;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  padding: 0px;
  line-height: 3rem;
}
.checkout-breadcrumb .scb-item.scb-current:before {
  background-color: #333;
}
</style>
