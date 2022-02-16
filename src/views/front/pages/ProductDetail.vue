<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert></Alert>
    <div>
      <nav aria-label="breadcrumb" class="mx-0">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/shop/product_show/all">商店</router-link>
          </li>
          <li class="breadcrumb-item" @click="goCat(product.category)">
            {{ product.category }}
          </li>
          <li class="breadcrumb-item">
            {{ product.title }}
          </li>
        </ol>
      </nav>
      <div class="row border border-primary px-3 py-5">
        <div class="col-md-12">
          <h3 class="text-right float-md-right">
            {{ product.title }}
            <span class="badge badge-primary">品項</span>
          </h3>
          <div
            class="float-md-left btn btn-outline-primary d-sm-none d-md-block d-none d-sm-block"
            @click="goBack"
          >
            <i class="fas fa-chevron-circle-left"></i
            ><span class="ml-1">返回商品列表</span>
          </div>
          <div class="float-md-left d-block d-sm-none" @click="goBack">
            <i class="fas fa-chevron-circle-left"></i>
          </div>
        </div>
        <div class="col-md-6 d-flex flex-column align-items-stretch">
          <img :src="product.imageUrl" class="img-fluid mt-3" :alt="product.description"/>
        </div>
        <div class="col-md-6">
          <div class="mt-3">
            <p class="py-1">
              <span class="badge badge-primary">特色</span>
              <a
                href="#" v-for="(des, index) in productDescription"
                :key="index" class="pr-3 font-text"
              >{{des}}</a>
            </p>
            <footer class="py-1 font-text">
              <span class="badge badge-primary">說明</span>
              {{ product.content }}
            </footer>
          </div>
          <div class="d-flex justify-content-between align-items-baseline mt-1">
            <div class="h4 font-text" v-if="!product.price">
              <span class="badge badge-primary">價格</span>
              {{ product.origin_price | currency }} 元
            </div>
            <del class="h6 font-text" v-if="product.price">
              <span class="badge badge-primary">價格</span>
              原價 {{ product.origin_price | currency }} 元
            </del>
            <div class="h4 font-text" v-if="product.price">
              現在只要 <span class="text-danger">{{ product.price | currency }}</span> 元
            </div>
          </div>
          <select class="form-control mt-3" v-model="product.num">
            <option selected value="0" disabled>--請選擇--</option>
            <option :value="num" v-for="num in 10" :key="num">
              選購 {{ num }} {{ product.unit }}
            </option>
          </select>
          <div class="mt-3">
            <div
              class="text-muted text-nowrap mr-3 mb-3 text-right"
              v-if="product.num"
            >
              小計 <strong>{{ product.num * product.price | currency }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary btn-block"
              @click="addtoStorage(product, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="product.id === status.loadingItem"
              ></i>
              加到購物車
            </button>
          </div>
          <div class="mt-3">
            <div class="h5 text-center border-top border-bottom mb-3 py-2">－購物需知－</div>
            <ol>
              <li class="font-text">配送統一由指定的貨運公司進行配送。</li>
              <li class="font-text">
                花禮皆為設計師手作完成，在實際成品的包裝、呈現手法，可能會因手工製作而略有差異。
              </li>
              <li class="font-text">
                預計產品送達日：<span class="ml-2 text-danger">{{ arriveTime() }}</span>
              </li>
              <li class="font-text">配送地點不包含離島及部分山區。</li>
            </ol>
          </div>
        </div>
      </div>
      <div class="row border border-primary px-3 py-3 mt-3">
        <div class="col-md-12 mb-4">
          <h5><i class="far fa-thumbs-up mr-2"></i>你可能會喜歡的商品</h5>
        </div>
        <div class="col-md-12">
          <MightLikeSwiper :descriptions="productDescription"></MightLikeSwiper>
        </div>
      </div>
      <div class="row border border-primary px-3 py-3 mt-3">
        <div class="col-md-12 mb-4">
          <h5><i class="fas fa-history mr-2"></i>最近瀏覽商品</h5>
        </div>
        <div class="col-md-12">
          <RecentlySwiper></RecentlySwiper>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Alert from '@/components/AlertMessage.vue';
import RecentlySwiper from '../Recently-swiper.vue';
import MightLikeSwiper from '../MightLike-swiper.vue';

export default {
  components: {
    Alert,
    RecentlySwiper,
    MightLikeSwiper,
  },
  data() {
    return {
      product: {
        num: '',
      },
      status: {
        loadingItem: '',
      },
      isLoading: false,
      id: '',
      days: '',
      productDescription: [],
      cartStorage: JSON.parse(localStorage.getItem('cartList')) || [],
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${vm.id}`;
      vm.status.loadingItem = vm.id;
      vm.$http.get(api).then((response) => {
        vm.product = response.data.product;
        // 將<select>的選項預設為<option selected value="0" disabled>--請選擇--</option>
        vm.product.num = 0;
        vm.status.loadingItem = '';
        vm.productDescription = vm.product.description.split('　');
      });
    },
    addtoStorage(data, qty = 1) {
      const vm = this;
      const cIdList = [];
      vm.cartStorage.forEach((item) => {
        cIdList.push(item.product_id);
      });
      if (!cIdList.includes(data.id)) {
        const { cartContent } = {
          product_id: data.id,
          qty,
        };
        vm.cartStorage.push(cartContent);
        // 重新寫入 localStorage
        localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
        vm.$bus.$emit('message:push', '已加入購物車', 'success');
        vm.$bus.$emit('put');
      } else {
        let cache = {}; // 產品暫存處
        vm.cartStorage.forEach((item, keys) => {
          // 只找相同的產品內容
          if (item.product_id === data.id) {
            let nowQty = item.qty;
            cache = {
              product_id: data.id,
              qty: nowQty += qty, // 產品當前數量+新增數量
            };
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            vm.cartStorage.splice(keys, 1);
          }
        });
        vm.cartStorage.push(cache);
        // 重新寫入 localStorage
        localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
        vm.$bus.$emit('message:push', '已加入購物車', 'success');
        vm.$bus.$emit('put');
      }
    },
    goBack() {
      const vm = this;
      if (window.history.length > 1) {
        vm.$router.go(-1);
      } else {
        vm.$router.push('/shop/product_show').catch(() => {});
      }
    },
    goCat(cat) {
      const vm = this;
      if (cat === '桌花') {
        vm.$router.push('/shop/product_show/table').catch(() => {});
      } else if (cat === '花束') {
        vm.$router.push('/shop/product_show/bouquet').catch(() => {});
      } else if (cat === '捧花') {
        vm.$router.push('/shop/product_show/wedding').catch(() => {});
      }
    },
    arriveTime() {
      const vm = this;
      const D = vm.days;
      const dateObject = new Date();
      dateObject.setDate(dateObject.getDate() + D);
      const date = dateObject.getDate();
      const day = dateObject.getDay();
      const month = dateObject.getMonth();
      const year = dateObject.getFullYear();
      const dayTw = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const monthTw = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
      const time = `${year}/${monthTw[month]}/${date}  ${dayTw[day]}`;

      return time;
    },
    isTime() {
      const vm = this;
      const dateObject = new Date();
      const day = dateObject.getDay();

      // 星期X時延後Y日送達
      if (day === 0) {
        vm.days = 2;
      } else if (day === 1) {
        vm.days = 2;
      } else if (day === 2) {
        vm.days = 2;
      } else if (day === 3) {
        vm.days = 2;
      } else if (day === 4) {
        vm.days = 4;
      } else if (day === 5) {
        vm.days = 3;
      } else if (day === 6) {
        vm.days = 3;
      }
    },
  },
  created() {
    this.id = this.$route.params.id;
    this.getProduct();
    this.isTime();
  },
};
</script>
<style lang="scss" scoped>
$hover: #eafaf1;

.breadcrumb-item{
  cursor: pointer;
}
.breadcrumb-item:hover {
  background-color: $hover;
  transition: background-color 0.5s ease-in-out;
}
.breadcrumb-item:last-child {
  cursor: text;
}
.breadcrumb-item:last-child:hover {
  background-color: #fff;
}
ol > li{
  padding: .5rem 0;
}
</style>
