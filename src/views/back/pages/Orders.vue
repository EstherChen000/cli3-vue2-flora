<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="table-responsive-md w-100 px-5">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">購買時間</th>
            <th scope="col">Email</th>
            <th scope="col">購買品項</th>
            <th scope="col">應付金額</th>
            <th scope="col">是否付款</th>
          </tr>
        </thead>
        <tbody v-if="orders.length">
          <tr
            v-for="(item, key) in sortOrder"
            :key="key"
            :class="{ 'text-secondary': !item.is_paid }"
          >
            <td scope="row">{{ item.create_at | date }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-right">{{ item.total | currency }}</td>
            <td>
              <strong v-if="item.is_paid" class="text-success">已付款</strong>
              <span v-else class="text-muted">尚未起用</span>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :pages="pagination"
        @emit="getOrders"
        class="d-flex justify-content-center"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orders: {},
      pagination: {},
      isNew: false,
      isLoading: false,
    };
  },
  methods: {
    getOrders(currentPage = 1) {
      // ES6參數預設值
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${currentPage}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api, vm.tempProduct).then((response) => {
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
  },
  computed: {
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      return newOrder;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
