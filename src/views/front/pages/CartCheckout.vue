<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="my-5 row justify-content-center w-100 m-auto">
      <div class="col-md-5 col-11 mx-auto">
        <h5>訂單明細</h5>
        <table class="table">
          <thead>
            <th class="border-right">品名</th>
            <th class="border-right">數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">
                {{ item.qty }}/{{ item.product.unit }}
              </td>
              <td class="align-middle text-right">{{ item.final_total | currency }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ cart.final_total | currency }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <form
        class="col-md-5 col-11 bg-white py-3 rounded border border-danger m-auto"
        @submit.prevent="creatOrder"
      >
        <div class="form-group">
          <label for="payway">付款方式<span class="text-danger">(*必填)</span></label>
          <select name="payway" id="payway" v-model="form.user.pay" class="form-control">
            <option value="atm">ATM付款</option>
            <option value="creditcard" selected>信用卡付款</option>
            <option value="linepay">LinePay付款</option>
            <option value="googlepay">GooglePay付款</option>
            <option value="applepay">ApplePay付款</option>
            <option value="cod">貨到付款</option>
          </select>
        </div>

        <div class="form-group">
          <label for="useremail">Email<span class="text-danger">(*必填)</span></label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            :class="{ 'is-invalid': errors.has('email') }"
            v-validate="'required|email'"
          />
          <span class="text-danger" v-if="errors.has('email')">{{
            errors.first("email")
          }}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名<span class="text-danger">(*必填)</span></label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            :class="{ 'is-invalid': errors.has('name') }"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('name')"
            >姓名必須輸入</span
          >
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
          />
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址<span class="text-danger">(*必填)</span></label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
            :class="{ 'is-invalid': errors.has('address')}"
            v-validate="'required'"
          />
          <span class="text-danger" v-if="errors.has('address')"
            >地址欄位不得留空</span
          >
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name="comment"
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="form.message"
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      cart: {},
      order: {
        user: {},
      },
      orderId: '',
      form: {
        user: {
          pay: 'creditcard',
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getCart() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;
      });
    },
    creatOrder() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      const vm = this;
      const order = vm.form;
      vm.isLoading = true;
      vm.$validator.validate().then((valid) => {
        if (valid) {
          // 當驗證成功時執行 AJAX 的行為
          vm.$http.post(api, { data: order }).then((response) => {
            if (response.data.success) {
              vm.$router.push(
                `/cart/cart_confirmation/${response.data.orderId}`,
              );
              localStorage.removeItem('cartList');
            }
            vm.isLoading = false;
          });
        } else {
          // 驗證失敗產生的行為
          vm.isLoading = false;
        }
      });
    },
  },
  created() {
    this.getCart();
    this.orderId = this.$route.params.orderId;
  },
};
</script>
