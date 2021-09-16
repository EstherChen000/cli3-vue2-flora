<template id="ProductShow">
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert></Alert>
    <div class="row mx-0">
      <!-- Sidebar -->
      <div class="col-md-3 col-sm-12 pl-0">
        <ul class="list-group border border-primary">
          <li
            class="list-group-item d-flex justify-content-between
            align-items-center border-bottom p-2"
            @click="filterProducts('all')"
          >
            所有商品
            <span class="badge badge-primary badge-pill">{{
              products.length
            }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between
            align-items-center border-bottom p-2"
            @click="filterProducts('table')"
          >
            桌花
            <span class="badge badge-primary badge-pill">{{
              productsTable.length
            }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between
            align-items-center border-bottom p-2"
            @click="filterProducts('bouquet')"
          >
            花束
            <span class="badge badge-primary badge-pill">{{
              productsBouquet.length
            }}</span>
          </li>
          <li
            class="list-group-item d-flex justify-content-between align-items-center p-2"
            @click="filterProducts('wedding')"
          >
            捧花
            <span class="badge badge-primary badge-pill">{{
              productsWedding.length
            }}</span>
          </li>
        </ul>
      </div>

      <!-- 產品列表 -->
      <div
        class="col-md-9 col-sm-12 border border-primary d-flex flex-row flex-wrap h-auto py-3"
      >
        <div class="d-flex flex-row flex-wrap h-auto py-3">
          <!-- 產品卡片 -->
          <div
            class="card mx-auto my-3"
            style="width:250px"
            v-for="item in productsNow"
            :key="item.id"
          >
            <div class="content-shadow">
              <div @click="getProduct(item.id)">
                <div
                  style="height: 300px; background-size: cover; background-position: center"
                  :style="{ backgroundImage: `url(${item.imageUrl})` }"
                ></div>
                <div class="card-body">
                  <span class="badge badge-primary float-right ml-2">
                    {{ item.category }}
                  </span>
                  <h5 class="card-title">
                    <a href="#" class="text-primary">{{ item.title }}</a>
                  </h5>
                  <div
                    class="d-flex justify-content-between align-items-baseline"
                  >
                    <div class="h5 text-primary" v-if="!item.price">
                      NT {{ item.origin_price | currency }}
                    </div>
                    <del class="h6 text-primary" v-if="item.price"
                      >NT {{ item.origin_price | currency }}
                    </del>
                    <div class="h5 text-danger" v-if="item.price">
                      NT {{ item.price | currency }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer d-flex justify-content-between">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="getProduct(item.id)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === item.id"
                  ></i>
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm ml-2"
                  @click="addtoStorage(item)"
                >
                  <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.loadingItem === item.id && inCar === true"
                  ></i>
                  加到購物車
                </button>
              </div>
            </div>
          </div>

          <!-- 佔位用 -->
          <div class="mx-auto my-3" style="width:250px"></div>
          <div class="mx-auto my-3" style="width:250px"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Alert from '@/components/AlertMessage.vue';

export default {
  components: {
    Alert,
  },
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      isLoading: false,
      productsTable: [],
      productsBouquet: [],
      productsWedding: [],
      productsNow: [],
      breadcrumbCategory: '所有商品',
      cartStorage: JSON.parse(localStorage.getItem('cartList')) || [],
      inCar: false,
    };
  },
  methods: {
    getProducts(cat) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.$router.push(`/shop/product_show/${cat}`).catch(() => {});
        // 將商品分類
        vm.productsTable = vm.products.filter((item) => item.category === '桌花');
        vm.productsBouquet = vm.products.filter((item) => item.category === '花束');
        vm.productsWedding = vm.products.filter((item) => item.category === '捧花');
        if (cat === 'all' || cat === undefined) {
          vm.productsNow = vm.products;
          vm.breadcrumbCategory = '所有商品';
          vm.$router.push('/shop/product_show/all').catch(() => {});
        } else if (cat === 'table') {
          vm.productsNow = vm.productsTable;
          vm.breadcrumbCategory = '桌花';
          vm.$router.push('/shop/product_show/table').catch(() => {});
        } else if (cat === 'bouquet') {
          vm.productsNow = vm.productsBouquet;
          vm.breadcrumbCategory = '花束';
          vm.$router.push('/shop/product_show/bouquet').catch(() => {});
        } else if (cat === 'wedding') {
          vm.productsNow = vm.productsWedding;
          vm.breadcrumbCategory = '捧花';
          vm.$router.push('/shop/product_show/wedding').catch(() => {});
        }
      });
    },
    getProduct(id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.product = response.data.product;
        // 開啟""查看更多"的商品分頁
        vm.$router.push(`/shop/product_detail/${id}`).catch(() => {});
        vm.status.loadingItem = '';
      });
    },
    addtoStorage(data, qty = 1) {
      const vm = this;
      const cIdList = [];
      vm.cartStorage.forEach((item) => {
        cIdList.push(item.product_id);
      });
      if (!cIdList.includes(data.id)) {
        const cartContent = {
          product_id: data.id,
          qty,
        };
        vm.inCar = true;
        vm.cartStorage.push(cartContent);
        // 重新寫入 localStorage
        localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
        vm.$bus.$emit('message:push', '已加入購物車', 'success');
        vm.$bus.$emit('put');
        vm.inCar = false;
      } else {
        let cache = {}; // 產品暫存處
        vm.inCar = true;
        vm.cartStorage.forEach((item, index) => {
          // 只找相同的產品內容
          if (item.product_id === data.id) {
            let nowQty = item.qty;
            cache = {
              product_id: data.id,
              qty: (nowQty += qty), // 產品當前數量+新增數量
            };
            // 移除現有 localStorage 購物車的資料，否則 localStorage 會重複加入
            vm.cartStorage.splice(index, 1);
          }
        });
        vm.cartStorage.push(cache);
        // 重新寫入 localStorage
        localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
        vm.$bus.$emit('message:push', '已加入購物車', 'success');
        vm.$bus.$emit('put');
        vm.inCar = false;
      }
    },
    filterProducts(now) {
      const vm = this;
      if (now === 'all') {
        vm.productsNow = vm.products;
        vm.breadcrumbCategory = '所有商品';
        vm.$router.push('/shop/product_show/all').catch(() => {});
      } else if (now === 'table') {
        vm.productsNow = vm.productsTable;
        vm.breadcrumbCategory = '桌花';
        vm.$router.push('/shop/product_show/table').catch(() => {});
      } else if (now === 'bouquet') {
        vm.productsNow = vm.productsBouquet;
        vm.breadcrumbCategory = '花束';
        vm.$router.push('/shop/product_show/bouquet').catch(() => {});
      } else if (now === 'wedding') {
        vm.productsNow = vm.productsWedding;
        vm.breadcrumbCategory = '捧花';
        vm.$router.push('/shop/product_show/wedding').catch(() => {});
      }
    },
  },
  created() {
    this.getProducts(this.$route.params.cat);
  },
};
</script>
<style lang="scss" scoped>
$hover: #eafaf1;

li {
  cursor: pointer;
}
li:hover {
  background-color: $hover;
  transition: background-color 0.5s ease-in-out;
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
</style>
