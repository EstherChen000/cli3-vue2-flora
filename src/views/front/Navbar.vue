<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-primary mx-n3 bg-white">
          <div>
            <h1>
              <router-link to="/" class="navbar-brand logo-font">Flora</router-link>
            </h1>
            <button
              class="navbar-toggler btn btn-outline-primary ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
            </button>
          </div>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item item-ani" :class="{ itemActive: path === 'home' }">
                <router-link to="/" class="nav-link">首頁</router-link>
              </li>
              <li class="nav-item item-ani" :class="{ itemActive: path === 'shop' }">
                <router-link to="/shop/product_show/all" class="nav-link">商店</router-link>
              </li>
              <li class="nav-item item-ani" :class="{ itemActive: path === 'faq' }">
                <router-link to="/faq" class="nav-link">常見問題</router-link>
              </li>
              <li class="nav-item item-ani" :class="{ itemActive: path === 'coupon' }">
                <router-link to="/couponnews" class="nav-link">優惠資訊</router-link>
              </li>
              <li class="nav-item item-ani">
                <router-link to="/login" class="nav-link"><i class="fas fa-user"></i></router-link>
              </li>
              <li class="nav-item item-ani nav-link" @click="goCart()">
                <a href="#">
                  <i class="fas fa-shopping-cart position-relative">
                    <span class="cart-num">{{ cartNum }}</span>
                  </i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      cartNum: 0,
      cartStorage: JSON.parse(localStorage.getItem('cartList')) || [],
      path: '',
    };
  },
  methods: {
    goCart() {
      const vm = this;
      vm.$router.push('/cart/cart_order');
    },
    getPath() {
      const vm = this;
      if (vm.$route.path === '/') {
        vm.path = 'home';
      } else if (vm.$route.path.includes('/shop')) {
        vm.path = 'shop';
      } else if (vm.$route.path === '/faq') {
        vm.path = 'faq';
      } else if (vm.$route.path === '/couponnews') {
        vm.path = 'coupon';
      }
    },
    updateCart() {
      const vm = this;
      vm.cartStorage = JSON.parse(localStorage.getItem('cartList'));
      vm.cartNum = vm.cartStorage.length;
    },
  },
  created() {
    const vm = this;
    vm.cartNum = vm.cartStorage.length;
    vm.getPath();
    vm.$bus.$on('put', () => {
      vm.updateCart();
    });
  },
};
</script>

<style lang="scss" scoped>
.cart-num{
  position: absolute;
  top: -1rem;
  right: -1rem;
  font-size: 1rem;
  display: block;
  height: 1.5rem;
  width: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  border-radius: 1rem;
  background-color: #78281F;
  color: #FFF;
}
.item-ani{
  border-bottom:3px solid #FFF;
  transition: border-bottom .5s ease-in-out;
}
.item-ani:hover{
  border-bottom: 1.5px solid #0B5345;
}
.itemActive{
  border-bottom: 1.5px solid #0B5345;
}
</style>
