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
            <tr v-for="item in order.products" :key="item.id">
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
              <td class="text-right">{{ order.total | currency }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <form
        class="col-md-5 col-11 bg-white py-3 rounded border border-danger m-auto"
        @submit.prevent="payOrder"
      >
        <h5>收件地址</h5>
        <div class="form-group">
          <label for="payway">付款方式</label>
          <select name="payway" id="payway" v-model="order.user.pay" class="form-control" disabled>
            <option value="atm">ATM付款</option>
            <option value="creditcard">信用卡付款</option>
            <option value="linepay">LinePay付款</option>
            <option value="googlepay">GooglePay付款</option>
            <option value="applepay">ApplePay付款</option>
            <option value="cod">貨到付款</option>
          </select>
        </div>

        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="order.user.email"
            placeholder="請輸入 Email"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="order.user.name"
            placeholder="輸入姓名"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            id="usertel"
            v-model="order.user.tel"
            placeholder="請輸入電話"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="text"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="order.user.address"
            placeholder="請輸入地址"
            disabled
          />
        </div>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea
            name="comment"
            id="comment"
            class="form-control"
            cols="30"
            rows="10"
            v-model="order.message"
            disabled
          ></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">確認付款</button>
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
      order: {
        user: {},
        message: '',
      },
      orderId: '',
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.order = response.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.getOrder();
          vm.$router.push('/cart/cart_final');
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
