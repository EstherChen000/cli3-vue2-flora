<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-5 row justify-content-center w-100">
      <div class="col-md-5 col-11">
        <div class="orderlist">
          <div v-show="isCart === false">
            購物車現在是空的喔！
            <router-link
              class="btn btn-primary ml-3 btn-sm"
              to="/shop/product_show"
              >前往購物
            </router-link>
          </div>
          <div class="card mt-2" v-for="item in cart" :key="item.id">
            <h5 class="card-header">
              {{ item.title }}
              <button
                type="button"
                class="btn btn-outline-danger btn-sm float-right"
                @click="removeCartItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </h5>
            <div class="card-body p-3">
              <div
                style="height: 100px; width: 75px; background-size: contain;
                background-repeat: no-repeat; background-position: left top"
                :style="{ backgroundImage: `url(${item.imageUrl})` }"
                class="float-left"
              ></div>
              <div class="float-right w-50">
                <div class="input-group h6">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      @click="productQty('reduce', item.id)"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                  <label
                    for="button"
                    class="form-control text-center"
                    v-if="item.qty == item.qtyN"
                    >{{ item.qtyN }}</label
                  >
                  <label
                    for="button"
                    class="form-control text-center"
                    v-if="item.qty !== item.qtyN"
                    >{{ item.qty }}</label
                  >
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-primary"
                      type="button"
                      @click="productQty('add', item.id)"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
                <div class="h6">優惠價 NT.{{ item.price | currency }}</div>
                <div class="h5 text-danger">
                  小計 NT.{{ (item.price * item.qty) | currency }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="input-group mt-3 input-group-sm" v-if="!isCoupon">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              @click="addCouponCode"
            >
              套用優惠碼
            </button>
          </div>
        </div>
        <div class="mt-1" :class="{ 'text-danger' : isWarrning}">{{ codeValidate }}</div>
      </div>
      <div class="col-md-5 col-11">
        <div class="card mt-2">
          <h5 class="card-header">
            購物車資訊
          </h5>
          <div class="card-body">
            <div class="text-right py-3">
              <div class="h6 ">小計 NT.{{ total | currency }}</div>
              <div v-if="finalTotal !== total" class="h6 text-info">
                折扣價 NT.{{ finalTotal | currency }}
              </div>
              <div class="h6 ">運費 NT.0</div>
              <hr />
              <div class="h5 text-danger">
                總計 NT.{{ finalTotal | currency }}
              </div>
            </div>
            <button
              class="btn btn-primary float-right"
              v-show="isCart === true"
              @click="addCartAPIandCoupon"
              >下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      status: {
        loadingItem: '',
      },
      isLoading: false,
      coupon_code: '',
      isCart: false,
      cartStorage: JSON.parse(localStorage.getItem('cartList')) || [],
      cart: [],
      finalTotal: 0,
      total: 0,
      discount: 1,
      coupon: [
        {
          title: '振興特優價',
          code: '3jvpd9',
          percent: 0.85,
          expiry: [2030, 9, 31],
        },
        {
          title: '新會員特惠',
          code: 'newmember',
          percent: 0.8,
          expiry: [2030, 11, 31],
        },
      ],
      isCoupon: false,
      isWarrning: false,
    };
  },
  methods: {
    removeCartItem(id) {
      const vm = this;
      const cList = [];
      const keep = [];
      let sum = 0;
      vm.isLoading = true;
      vm.cart.forEach((e) => {
        if (e.id !== id) {
          const cartContent = {
            product_id: e.id,
            qty: e.qty,
            coupon: vm.coupon_code,
            off: vm.discount,
          };
          cList.push(cartContent);
          keep.push(e);
        }
      });
      vm.cart = keep;
      vm.cartStorage = cList;
      localStorage.removeItem('cartList');
      localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
      vm.isLoading = false;
      if (keep.length === 0) {
        vm.isCart = false;
      } else {
        vm.isCart = true;
      }
      vm.cart.forEach((item) => {
        sum += item.price * item.qty;
      });
      vm.total = sum;
      vm.finalTotal = sum * vm.discount;
    },
    addCouponCode() {
      const vm = this;
      vm.coupon.forEach((e) => {
        if (vm.coupon_code.trim() === e.code && vm.isCoupon === false) {
          vm.discount = e.percent;
        }
      });
      if (vm.isCoupon === false) {
        let cache = {};
        vm.total *= vm.discount;
        vm.finalTotal *= vm.discount;
        vm.cart.forEach((e) => {
          e.price *= vm.discount;
          cache = {
            product_id: e.id,
            qty: e.qty,
            coupon: vm.coupon_code,
            off: vm.discount,
          };
        });
        vm.cartStorage = [];
        vm.cartStorage.push(cache);
        localStorage.removeItem('cartList');
        localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
        vm.isCoupon = true;
      }
    },
    storageToCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      let cache = [];
      vm.$http.get(api).then((response) => {
        cache = response.data.products;
        if (vm.cartStorage.length === 0) {
          vm.isCart = false;
        } else {
          // 先取出localStorage中的ID在做篩選
          const id = [];
          let sum = 0;
          vm.isCart = true;
          vm.cartStorage.forEach((item) => {
            id.push(item.product_id);
            if (item.coupon) {
              vm.isCoupon = true;
              vm.discount = item.off;
              vm.coupon_code = item.coupon;
            }
          });
          const keep = [];
          cache.forEach((item) => {
            id.forEach((e) => {
              if (item.id === e) {
                keep.push(item);
              }
            });
          });
          vm.cart = keep;
          vm.cart.forEach((item) => {
            vm.cartStorage.forEach((e) => {
              if (item.id === e.product_id) {
                item.qty = e.qty; // eslint-disable-line no-param-reassign
              }
            });
            sum += item.price * item.qty;
          });
          vm.total = sum;
          vm.finalTotal = sum * vm.discount;
        }
      });
    },
    addCartAPIandCoupon() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const apiCoupon = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const vm = this;
      let cart = {};
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      vm.cartStorage.forEach((item) => {
        cart = {
          product_id: item.product_id,
          qty: item.qty,
        };
        vm.$http.post(api, { data: cart }).then(() => {
          vm.$bus.$emit('message:push', '已加入購物車', 'success');
        });
      });
      vm.$http.post(apiCoupon, { data: coupon }).then(() => {
        vm.isLoading = false;
        localStorage.removeItem('cartList');
        vm.$router.push('/cart/cart_checkout');
      });
    },
    productQty(act, id) {
      const vm = this;
      const cList = [];
      if (act === 'add') {
        vm.cart.forEach((e, key) => {
          if (e.id === id) {
            e.qty += 1;
            vm.$bus.$emit('message:push', '商品數目已變更', 'success');
            vm.$set(vm.cart[key], 'qtyN', e.qty);
          }
          const cartContent = {
            product_id: e.id,
            qty: e.qty,
          };
          cList.push(cartContent);
        });
      } else if (act === 'reduce') {
        vm.cart.forEach((e, key) => {
          if (e.id === id) {
            e.qty -= 1;
            vm.$bus.$emit('message:push', '商品數目已變更', 'success');
            vm.$set(vm.cart[key], 'qtyN', e.qty);
          }
          const cartContent = {
            product_id: e.id,
            qty: e.qty,
          };
          cList.push(cartContent);
        });
      }
      vm.cartStorage = cList;
      localStorage.removeItem('cartList');
      localStorage.setItem('cartList', JSON.stringify(vm.cartStorage));
    },
  },
  computed: {
    codeValidate() {
      const vm = this;
      let message = '';
      // 因無法用歷遍取出故直接列出
      if (vm.coupon_code.trim() === '3jvpd9') {
        message = '可使用優惠券 振興特優價';
        vm.isWarrning = false;
      } else if (vm.coupon_code.trim() === 'newmember') {
        message = '可使用優惠券 新會員特惠';
        vm.isWarrning = false;
      } else if (vm.coupon_code.trim() === '' && vm.isCoupon === false) {
        message = '請輸入優惠券';
        vm.isWarrning = false;
      } else if (vm.isCoupon === true) {
        message = '購物車商品已經套用優惠券囉';
        vm.isWarrning = true;
      } else {
        message = '請輸入有效優惠券';
        vm.isWarrning = true;
      }
      return message;
    },
  },
  created() {
    const vm = this;
    vm.storageToCart();
  },
};
</script>
