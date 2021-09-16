<template>
  <div>
    <div class="fixed-top navbar--content">
      <Navbar/>
    </div>
    <AlertMessage></AlertMessage>
    <div class="position-relative">
      <div class="sidebar">
        <Sidebar></Sidebar>
      </div>
      <main class="main" role="main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AlertMessage from '../AlertMessage';

export default {
  components: {
    Sidebar,
    Navbar,
    AlertMessage,
  },
  created() {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken'))
      .split('=')[1];
    this.$http.defaults.headers.common.Authorization = cookieValue;
  },
};
</script>
<style scoped>
.navbar--content{
  z-index: 2000;
  height: 30px;
}
.sidebar {
  padding: 0;
  position: fixed;
  z-index: 1042;
  height: auto;
  width: 0px;
}
.main {
  position: absolute;
  top: 5rem;
  /* left: 20%; */
  width: 100%;
  z-index: 1041;/*需比modal高 */
  height: auto;
}
</style>
