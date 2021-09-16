<template>
  <div>
    <input type="checkbox" name="" id="sidebar-toggle" />
    <nav class="bg-light sidebar">
      <div class="sidebar--user bg-dark">
        <div class="sidebar--user--img">
          <img
            class="rounded-circle"
            src="https://picsum.photos/100/100/?random=1"
          />
        </div>
        <div class="sidebar--user--text overflow-auto w-100 text-center">
          <a href="#" class="text-decoration-none">lu1016.my@gmail.com</a>
        </div>
      </div>
      <div class="sidebar--menu px-3">
        <h6>
          管理員
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products">
              <i class="fas fa-box-open"></i>
              產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">
              <i class="fas fa-box-open"></i>
              訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/coupons" class="nav-link">
              <i class="fas fa-ticket-alt"></i> 優惠券
            </router-link>
          </li>
        </ul>
      </div>
      <label for="sidebar-toggle">
        <i class="fas fa-angle-right"></i>
      </label>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sidebarToggle: true,
    };
  },
  methods: {
    handleToggle() {
      const vm = this;
      vm.$bus.$on('toggle', () => {
        vm.sidebarToggle = !vm.sidebarToggle;
      });
    },
  },
  created() {
    this.handleToggle();
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  width: 300px;
  border-right: 3px solid #d1d1d1;
  box-shadow: 5px 0 5px rgba(23, 23, 54, 0.6);
  position: relative;
  transform: translateX(-100%);
  transition: 0.5s;
  h6 {
    border-bottom: 1px solid #333;
    padding-top: 1rem;
    padding-left: 1rem;
  }
}
@media (max-width: 420px) {
  .sidebar {
    width: 250px;
  }
}
.sidebar--user {
  padding: 5rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
label {
  width: 30px;
  height: 80px;
  background-color: #d1d1d1;
  color: #686666;
  position: absolute;
  right: -30px;
  top: 0;
  bottom: 0;
  margin: auto;
  line-height: 80px;
  text-align: center;
  border-radius: 0 5px 5px 0;
  box-shadow: 5px 0 5px rgba(23, 23, 54, 0.6);
  cursor: pointer;
  display: block;
}
#sidebar-toggle {
  position: absolute;
  opacity: 0;
  z-index: -1;
}
#sidebar-toggle:checked + .sidebar {
  transform: translateX(0);
  label .fas {
    transform: scaleX(-1);
  }
}
</style>
