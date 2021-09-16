<template>
  <div>
    <nav class="navbar navbar-dark sticky-top bg-dark p-1">
      <button
        class="navbar-toggler mx-3 d-none"
        type="button"
        @click="toggle"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/" class="navbar-brand px-3"
        >flora</router-link
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Navbar',
  data() {
    return {
      sidebarToggle: true,
    };
  },
  methods: {
    signout() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
    toggle() {
      const vm = this;
      vm.sidebarToggle = !vm.sidebarToggle;
      vm.$bus.$emit('toggle', vm.sidebarToggle);
    },
  },
};
</script>
